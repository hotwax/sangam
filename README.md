# Shopify Theme Development Setup Guide

Welcome to the Shopify theme development environment for **Sangam**. To ensure a productive workflow, especially when using AI-powered development tools like Cursor or Antigravity, please follow the setup instructions below.

## 1. Prerequisites

Ensure you have the following installed on your machine:

- **[Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install)**: The command-line tool for developing Shopify themes.
- **[Node.js](https://nodejs.org/)**: Version 18 or higher (LTS recommended).
- **Git**: For version control and collaborative development.

## 2. IDE Configuration

We recommend using **VS Code** or **Cursor** for the best development experience.

### Recommended Extensions
- **[Shopify Liquid](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode)**: Provides syntax highlighting, linting, and language support for Liquid.
- **ESLint**: For JavaScript linting.
- **Prettier**: For consistent code formatting.

---

## 3. Model Context Protocol (MCP) Setup

MCP servers expand the capabilities of your AI assistant (Cursor, Antigravity, Claude Desktop) by providing it with real-time documentation, API schemas, and tool access.

### A. Shopify Dev MCP
Integrates Shopify documentation and API schemas directly into your AI assistant.

- **Command**: `npx`
- **Arguments**: `["-y", "@shopify/dev-mcp@latest"]`
- **Documentation**: [Shopify Dev MCP Guide](https://shopify.dev/docs/apps/build/devmcp)

### B. GitHub MCP
Allows your AI assistant to browse repositories, manage issues, and create pull requests.

- **Command**: `npx`
- **Arguments**: `["-y", "@modelcontextprotocol/server-github"]`
- **Environment Variables**:
  - `GITHUB_PERSONAL_ACCESS_TOKEN`: A Personal Access Token (PAT) with `repo` scope.

---

## 4. How to add MCP Servers to your IDE

### For Antigravity Users:

1. Open your **Antigravity Settings**.
2. Navigate to **MCP Servers**.
3. Add the following configuration to your `mcp_config.json` or via the UI:

```json
{
  "mcpServers": {
    "shopify-dev": {
      "command": "npx",
      "args": ["-y", "@shopify/dev-mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"
      }
    }
  }
}
```

### For VS Code Users:
Follow the instructions provided by your specific AI extension (e.g., Continue, Roo-Code) on how to add MCP servers to their configuration.

---

## 5. Local Development Workflow

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sangam
   ```

2. **Login to Shopify**:
   ```bash
   shopify login --store <your-store-name>.myshopify.com
   ```

3. **Start local development server**:
   ```bash
   shopify theme dev
   ```

## 6. Theme Customization & Skills

To help both humans and AI agents customize complex features like BOPIS (Buy Online, Pick Up In Store), we have provided specialized guides:

- **BOPIS Customization Guide**: See [docs/BOPIS_CUSTOMIZATION.md](file:///Users/adityapatel/Documents/GitHub/sangam/docs/BOPIS_CUSTOMIZATION.md) for a human-friendly overview of how to change the look and feel of the pickup button and modal.
- **AI Agent Skills**: We have defined localized "Skills" for AI assistants like Antigravity to ensure they follow theme-specific best practices:
  - [BOPIS Customizer](file:///Users/adityapatel/Documents/GitHub/sangam/.agents/skills/bopis-customizer/SKILL.md): For modifying the store pickup experience.
  - [Skill Creator](file:///Users/adityapatel/Documents/GitHub/sangam/.agents/skills/skill-creator/SKILL.md): A meta-skill to help agents create NEW skills following the `agentskills.io` spec.

## Resources
- [Shopify Theme Documentation](https://shopify.dev/docs/themes)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Model Context Protocol (MCP) Overview](https://modelcontextprotocol.io/)
