---
name: skill-creator
description: Use this skill to correctly scaffold new agent skills in this repository. Ensure all new skills follow the agentskills.io standard (YAML frontmatter, specific folder structure).
---

# Agent Skill Creation Spec

To maintain consistency and ensure AI assistants like Antigravity can effectively use this theme, all new capabilities must be documented as "Skills".

## 📁 Directory Structure

All skills must live in the `.agents/skills/` directory:
```text
.agents/
└── skills/
    └── [skill-name]/
        ├── SKILL.md      <-- Required
        ├── scripts/       <-- Optional (Helper scripts)
        └── resources/     <-- Optional (Templates, assets)
```

## 📄 SKILL.md Formatting

The `SKILL.md` file MUST follow the **agentskills.io** open standard, which requires YAML frontmatter followed by Markdown content.

### Required Fields:
- **`name`**: Unique identifier (kebab-case, lowercase letters/numbers).
- **`description`**: Clear, specific trigger conditions (max 1024 characters). Tell the agent *when* and *why* to use this skill.

### Template:
```markdown
---
name: my-new-skill
description: Use this skill when [trigger condition/specific task].
---

# Skill Title

Skill content goes here. Use markdown for:
- 🏗 Architecture details (where code lives)
- 🛠 Customization steps
- 🚀 Best practices (naming conventions, patterns)
- ⚠️ Gotchas
```

## 🚀 Best Practices for Skill Content
1. **Be Specific**: Include file paths, line ranges, or specific CSS classes/variable names.
2. **Include Links**: Use absolute `file:///` URLs (clickable in most agent UIs).
3. **Trigger Words**: In the description, include common keywords a user might use to prompt the skill.

## 📦 How to "Install" a Skill
1. Create the directory: `.agents/skills/[name]`
2. Create the `SKILL.md` file with the correct frontmatter.
3. Update the `README.md` if the skill is intended for human use as well.
