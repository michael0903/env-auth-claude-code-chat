import * as vscode from 'vscode';

export interface ApiMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ApiResponse {
    id: string;
    type: 'message';
    role: 'assistant';
    content: Array<{
        type: 'text';
        text: string;
    }>;
    model: string;
    stop_reason: string | null;
    stop_sequence: string | null;
    usage: {
        input_tokens: number;
        output_tokens: number;
    };
}

export interface ApiStreamResponse {
    type: string;
    message?: ApiResponse;
    delta?: {
        type: string;
        text?: string;
    };
    usage?: {
        input_tokens: number;
        output_tokens: number;
    };
}

export class ClaudeApiClient {
    private apiKey: string;
    private apiEndpoint: string;
    private messages: ApiMessage[] = [];
    private currentSessionId: string;

    constructor() {
        const config = vscode.workspace.getConfiguration('claudeCodeChat');
        this.apiKey = config.get<string>('api.key', '');
        this.apiEndpoint = config.get<string>('api.endpoint', 'https://api.anthropic.com/v1/messages');
        this.currentSessionId = this.generateSessionId();
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    public newSession(): void {
        this.messages = [];
        this.currentSessionId = this.generateSessionId();
    }

    public getSessionId(): string {
        return this.currentSessionId;
    }

    public async sendMessage(
        message: string,
        onChunk: (data: any) => void,
        model: string = 'claude-3-5-sonnet-20241022'
    ): Promise<void> {
        // Add user message to history
        this.messages.push({ role: 'user', content: message });

        const config = vscode.workspace.getConfiguration('claudeCodeChat');
        this.apiKey = config.get<string>('api.key', '');
        this.apiEndpoint = config.get<string>('api.endpoint', 'https://api.anthropic.com/v1/messages');

        if (!this.apiKey) {
            throw new Error('API key not configured. Please set claudeCodeChat.api.key in settings.');
        }

        const requestBody = {
            model: model,
            max_tokens: 4096,
            messages: this.messages,
            stream: true,
            temperature: 0,
            system: "You are Claude, an AI assistant created by Anthropic. You are viewing the user's workspace in VS Code and can help with coding tasks."
        };

        const startTime = Date.now();
        
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true' // For browser environments
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';
            let totalInputTokens = 0;
            let totalOutputTokens = 0;

            if (!reader) {
                throw new Error('Response body is not readable');
            }

            // Send initial system message
            onChunk({
                type: 'system',
                subtype: 'init',
                session_id: this.currentSessionId
            });

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.slice(6);
                        if (jsonStr === '[DONE]') continue;
                        
                        try {
                            const data = JSON.parse(jsonStr);
                            
                            // Convert API stream format to Claude CLI format
                            if (data.type === 'message_start') {
                                // Initial message
                                if (data.message?.usage) {
                                    totalInputTokens = data.message.usage.input_tokens || 0;
                                }
                            } else if (data.type === 'content_block_delta') {
                                // Text chunk
                                if (data.delta?.text) {
                                    assistantMessage += data.delta.text;
                                    onChunk({
                                        type: 'assistant',
                                        message: {
                                            content: [{
                                                type: 'text',
                                                text: data.delta.text
                                            }],
                                            usage: {
                                                input_tokens: totalInputTokens,
                                                output_tokens: totalOutputTokens
                                            }
                                        }
                                    });
                                }
                            } else if (data.type === 'message_delta') {
                                // Usage update
                                if (data.usage) {
                                    totalOutputTokens = data.usage.output_tokens || 0;
                                }
                            } else if (data.type === 'message_stop') {
                                // Message complete
                                // Add assistant message to history
                                this.messages.push({ role: 'assistant', content: assistantMessage });
                                
                                // Send final result
                                onChunk({
                                    type: 'result',
                                    subtype: 'success',
                                    session_id: this.currentSessionId,
                                    total_cost_usd: this.calculateCost(totalInputTokens, totalOutputTokens),
                                    duration_ms: Date.now() - startTime,
                                    num_turns: Math.ceil(this.messages.length / 2)
                                });
                            }
                        } catch (e) {
                            console.error('Failed to parse streaming data:', e);
                        }
                    }
                }
            }
        } catch (error: any) {
            console.error('API request error:', error);
            throw error;
        }
    }

    private calculateCost(inputTokens: number, outputTokens: number): number {
        // Rough cost calculation (adjust based on your organization's pricing)
        const inputCostPerMillion = 3.00;  // $3 per million input tokens
        const outputCostPerMillion = 15.00; // $15 per million output tokens
        
        const inputCost = (inputTokens / 1000000) * inputCostPerMillion;
        const outputCost = (outputTokens / 1000000) * outputCostPerMillion;
        
        return inputCost + outputCost;
    }

    public loadSession(messages: ApiMessage[]): void {
        this.messages = messages;
    }

    public getMessages(): ApiMessage[] {
        return this.messages;
    }
}