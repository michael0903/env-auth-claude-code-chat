# Claude Code Chat - Environment Auth Edition

A fork of [claude-code-chat](https://github.com/andrepimenta/claude-code-chat) that removes web UI authentication prompts for organizations using environment-based Claude CLI authentication.

## Why This Fork?

The original Claude Code Chat requires web-based authentication and opens browser prompts when authentication fails. This fork is designed for organizations that:

✅ **Use environment-based authentication** - API keys, config files, or custom auth setups  
✅ **Want to avoid web UI prompts** - No browser popups or terminal login flows  
✅ **Have pre-configured Claude CLI** - Authentication handled at the CLI level  
✅ **Use custom Claude endpoints** - Corporate or organizational Claude deployments  

## Key Changes

- **Removed web UI authentication prompts** - No more browser-based login flows
- **Simplified error handling** - Clear error messages when authentication fails
- **Maintains full CLI functionality** - All tools, MCP servers, and features preserved
- **Clean error reporting** - Authentication issues reported directly in chat

## Setup Requirements

1. **Pre-configured Claude CLI** - Your Claude CLI must already be authenticated
2. **Environment setup** - API keys, config files, or custom authentication in place
3. **No additional configuration** - The extension works with your existing Claude CLI setup

## Installation

1. **Build from source** or install the pre-built `.vsix` file
2. **Ensure Claude CLI is working** - Test with `claude --help` in terminal
3. **Open Claude Code Chat** - Press `Cmd+Shift+C` (Mac) or `Ctrl+Shift+C` (Windows/Linux)

## Authentication Setup Examples

### Organization Config File
```bash
# Place your settings.json in ~/.claude/
~/.claude/settings.json
```

### Environment Variables
```bash
export CLAUDE_API_KEY="your-api-key"
export CLAUDE_API_ENDPOINT="https://your-org-endpoint.com"
```

### Custom Claude CLI Configuration
Works with any Claude CLI setup that doesn't require web authentication.

## What This Fork Does NOT Change

- ✅ **All Claude CLI features** - Tools, MCP servers, file operations, etc.
- ✅ **Session management** - Resume sessions, conversation history
- ✅ **Permission system** - Tool approval workflows remain
- ✅ **Model selection** - Opus, Sonnet, and other model options
- ✅ **WSL support** - Windows WSL configurations still work

## Error Handling

When authentication fails, you'll see:
```
Claude authentication failed. Please ensure your Claude CLI is properly configured with authentication credentials.
```

No browser windows, no terminal prompts - just a clear message to check your authentication setup.

## Use Cases

- **Corporate environments** with centralized authentication
- **Air-gapped networks** with internal Claude deployments  
- **Automated setups** where web UI authentication isn't practical
- **Development environments** with pre-configured authentication

## Contributing Back

This fork maintains the same codebase structure as the original. The authentication changes are minimal and focused, making it easy to:
- Sync updates from the original project
- Contribute non-auth features back upstream
- Maintain compatibility with the original project

## Sync with Upstream

This fork regularly syncs with [the original project](https://github.com/andrepimenta/claude-code-chat) to get the latest features and fixes.

## License

Same as the original project.