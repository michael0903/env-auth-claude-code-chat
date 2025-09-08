# Claude Code Chat - API Mode Setup

This modified version of Claude Code Chat allows you to use your organization's Claude API endpoint directly instead of the Claude CLI.

## Configuration Steps

1. **Install the Extension**
   - Press `F5` in VS Code to run the extension in debug mode
   - Or package it with `vsce package` and install the `.vsix` file

2. **Configure API Settings**
   
   Open VS Code settings (`Cmd+,` on Mac, `Ctrl+,` on Windows/Linux) and search for "Claude Code Chat" or add these to your `settings.json`:

   ```json
   {
     // Enable API mode instead of CLI
     "claudeCodeChat.api.useApiMode": true,
     
     // Your organization's API key
     "claudeCodeChat.api.key": "YOUR_API_KEY_HERE",
     
     // Your organization's API endpoint (optional, defaults to Anthropic's endpoint)
     "claudeCodeChat.api.endpoint": "https://your-org-api.example.com/v1/messages"
   }
   ```

3. **Model Selection**
   
   The extension supports these models:
   - `default` - Uses Claude 3.5 Sonnet (latest)
   - `sonnet` - Claude 3.5 Sonnet
   - `opus` - Claude 3 Opus

   You can switch models using the model selector in the chat interface.

## Usage

1. **Open Claude Code Chat**
   - Press `Cmd+Shift+C` (Mac) or `Ctrl+Shift+C` (Windows/Linux)
   - Or use Command Palette: `Cmd+Shift+P` → "Open Claude Code Chat"
   - Or click the Claude icon in the activity bar

2. **Start Chatting**
   - Type your message and press Enter
   - The extension will use your configured API endpoint
   - All responses are streamed in real-time

## Features When Using API Mode

✅ **Working Features:**
- Basic chat functionality
- Streaming responses
- Token counting and cost estimation
- Session management
- Conversation history
- Model selection (Opus/Sonnet)

❌ **Features Not Available in API Mode:**
- Tool use (file reading/writing, bash commands, etc.)
- MCP server integration
- Permission management
- Resume session functionality
- Slash commands (/model, /context, etc.)

## Troubleshooting

### API Key Issues
- Make sure your API key is correctly set in settings
- Check that the key has proper permissions for your organization's endpoint

### Connection Issues
- Verify the API endpoint URL is correct
- Check if you need to be on a VPN or specific network
- Look for errors in Help → Toggle Developer Tools → Console

### No Response
- Check the Output panel (View → Output) and select "Claude Code Chat"
- Verify network connectivity
- Ensure the API endpoint accepts the Anthropic message format

## API Endpoint Requirements

Your organization's API endpoint should:
1. Accept the Anthropic Messages API format
2. Support streaming responses (SSE format)
3. Return responses compatible with the Anthropic API structure

## Security Note

Your API key is stored in VS Code's settings. For better security:
- Use workspace settings for project-specific keys
- Consider using environment variables if your org supports it
- Never commit settings.json with API keys to version control

## Switching Between CLI and API Mode

You can switch between modes by changing the `claudeCodeChat.api.useApiMode` setting:
- `true` - Use direct API calls
- `false` - Use Claude CLI (requires CLI installation and authentication)