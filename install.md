# Claude Code Chat (Environment Auth) - Installation Guide

## 📋 **About This Version**

This is an **organizational version** of Claude Code Chat, prepared by **Michael Fu** for users who need environment-based authentication instead of web UI login flows.

**Based on:** [Original claude-code-chat](https://github.com/andrepimenta/claude-code-chat) by Andre Pimenta  
**Modified for:** Organizations with pre-configured Claude CLI authentication

---

## 🚀 **Quick Install (Recommended)**

1. Download `claude-code-chat-env-auth-1.0.6-env-auth.vsix` 
2. Install via command line:
   ```bash
   code --install-extension claude-code-chat-env-auth-1.0.6-env-auth.vsix
   ```
3. Restart VS Code
4. Use `Cmd+Shift+C` (Mac) or `Ctrl+Shift+C` (Windows/Linux) to open

## 🔧 **From Source (Advanced)**

```bash
git clone https://github.com/michael0903/env-auth-claude-code-chat.git
cd env-auth-claude-code-chat
npm install
npm run compile
code --install-extension .
```

## ✨ **Key Differences from Original**

- ✅ **No web UI authentication prompts** - No browser windows or terminal login flows
- ✅ **Environment-based authentication** - Works with pre-configured Claude CLI
- ✅ **All functionality preserved** - Tools, MCP servers, permissions, etc. all work
- ✅ **Organizational ready** - Perfect for corporate environments

## 📋 **Requirements**

- **Pre-configured Claude CLI** with working authentication
- **VS Code 1.94.0 or higher**
- **Environment-based auth setup** (API keys, config files, etc.)

## 🆘 **Support**

For issues with this organizational version, contact: **Michael Fu**  
For general Claude Code Chat questions, see: [Original Project](https://github.com/andrepimenta/claude-code-chat)