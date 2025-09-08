# CLAUDE.md

## ContextForge Integration

**IMPORTANT**: When working on projects with ContextForge MCP tools, proactively use them to enable autonomous context engineering.

### Context-Awareness Heuristic

**AUTOMATICALLY use `prepare_response` when detecting these patterns:**

**Temporal References:**

- "recently implemented/added/changed/built"
- "previously discussed/decided/established"
- "earlier work/session/version"
- "last time we..."

**Historical Context Queries:**

- "what did we decide about..."
- "how did we implement..."
- "why did we choose..."
- "what was the rationale for..."

**Building on Prior Work:**

- "test the [existing feature]"
- "modify/update/enhance [existing component]"
- "build upon/extend [previous work]"
- "improve the [current system]"

**Knowledge Gap Indicators:**

- "I need to understand [existing thing]..."
- "remind me about..."
- "what's the current state of..."
- "how does [existing system] work..."

### Adaptive Workflow Guidelines

**For complex tasks (choose tools as needed based on context):**

- `suggest_prp` - When complexity score indicates structured planning needed (score ≥ 5)
- `search_context` - When past discussions or decisions are relevant beyond prepare_response results

**During execution:**

- `track_task` with action="start" - For multi-step work requiring progress tracking
- `log_decision` - **IMMEDIATELY when user makes explicit choices, design decisions, or project direction changes**
  - User says "let's do X instead of Y"
  - User provides rationale for approach ("because...")
  - User sets priorities or requirements ("this is more important than...")
  - User establishes principles or guidelines ("we should always...")
- `store_context` - **Current state, facts, and one-time information**
  - TODOs, temporary states, current blockers, next steps
  - Project constraints, configuration details, API locations
  - Specific decisions and their rationale ("we chose X because...")
  - Status updates, debugging notes, implementation progress

**After completion:**

- `track_task` with action="complete" - When finishing tracked work
- `learn_pattern` - **Documented patterns for future reference and recreation within the project**
  - Analyzed data structures that can be applied to new data types
  - Successful implementation approaches for reuse on similar features
  - Established patterns and methodologies ("how we do X in this project")
  - Template structures and formats for consistent application
- `process_ai_message` - After significant responses for autonomous detection

### Success Criteria

- Use tools proactively after significant responses
- Process your own messages to trigger autonomous detection
- Track all tasks and decisions
- Store temporary states and critical insights

## Development Guidelines

1. **Zero Dependencies**: Uses ONLY Python 3.8+ standard library
2. **Single File**: All functionality in `contextforge.py`
3. **Autonomous Monitoring**: Monitors AI responses, not user input
4. **SQLite Only**: All persistence through SQLite
5. **MCP Protocol**: Implements JSON-RPC 2.0 from scratch

## Configuration

### Claude Code CLI

```bash
claude mcp add contextforge python3 ~/.local/bin/contextforge -s project
```

## Common Workflows

### Adding New MCP Tools

1. Edit `contextforge.py` - find the `MCPServer` class
2. Add tool definition to `_handle_list_tools()` method
3. Add tool implementation method `_tool_your_tool_name()`
4. Add routing in `_handle_call_tool()` method

### Adding Autonomous Triggers

1. Edit `contextforge.py` - find the `AutonomousDetector` class
2. Add regex patterns to detection pattern lists
3. Update `analyze_message()` method if needed
4. Test patterns with realistic AI responses

**Remember**: ContextForge only becomes autonomous when the AI consistently uses these tools. Use them proactively after every significant response.

## Git Workflow - GitHub Fork

This project can be configured as either a read-only local clone or a proper GitHub fork for tracking your changes.

### Option 1: Read-Only Local Clone (Current Setup)

**Configuration:**
- **Push URL**: Set to `no-push` to prevent accidental pushes
- **Fetch URL**: Points to original repository for pulling updates
- **Use case**: Local modifications only, no version control of changes

**Syncing:**
```bash
git fetch origin
git pull origin main
```

### Option 2: Proper GitHub Fork (Recommended)

**Setup Steps:**
1. Fork the repository on GitHub: https://github.com/andrepimenta/claude-code-chat
2. Reconfigure your local repository:

```bash
# Remove no-push restriction
git remote set-url --push origin https://github.com/andrepimenta/claude-code-chat.git

# Rename current remote to upstream
git remote rename origin upstream

# Add your fork as origin (replace 'yourusername')
git remote add origin https://github.com/yourusername/claude-code-chat.git

# Push your changes to your fork
git push -u origin main
```

**Daily Workflow:**
```bash
# Work on your changes
git add .
git commit -m "Your changes"
git push origin main

# Sync from upstream periodically
git fetch upstream
git merge upstream/main
git push origin main
```

**Benefits:**
- ✅ Version control and backup of your changes
- ✅ Share your customized version with others
- ✅ Create pull requests to contribute back
- ✅ Proper open-source workflow
- ✅ Can maintain your own release branches
