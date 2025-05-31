# @notion-md-converter/cli

CLI tool for converting Notion pages to Markdown.

## 🚀 Installation

### **Using npx (recommended)**

```shell
npx @notion-md-converter/cli convert -p <PAGE_ID_OR_URL> -t <NOTION_TOKEN>
```

### **Global installation**

```shell
npm install -g @notion-md-converter/cli
```

## 📖 Usage

> Follow Notion's Getting Started Guide to obtain an API key.

### Basic Example

Convert a Notion page to Markdown and output to stdout:

```shell
npx @notion-md-converter/cli convert --page <PAGE_ID_OR_URL> --token <NOTION_TOKEN>
```

### Command Options

- `-p, --page <pageId>`: Notion page ID or URL (required)
- `-t, --token <token>`: Notion API token (required)
- `-h, --help`: Display help for command
- `-V, --version`: Output the version number

### Usage Examples

**Using page ID:**
```shell
npx @notion-md-converter/cli convert -p 12345678901234567890123456789012 -t secret_abc123
```

**Using page URL:**
```shell
npx @notion-md-converter/cli convert -p "https://www.notion.so/My-Page-12345678901234567890123456789012" -t secret_abc123
```

**Saving to file:**
```shell
npx @notion-md-converter/cli convert -p <PAGE_ID> -t <TOKEN> > output.md
```

**Using environment variables:**
```shell
export NOTION_TOKEN="secret_abc123"
npx @notion-md-converter/cli convert -p <PAGE_ID> -t $NOTION_TOKEN
```

## Getting Notion API Token

1. Go to [Notion Developers](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name and select the workspace
4. Copy the "Internal Integration Token"
5. Share your page with the integration:
   - Open the page in Notion
   - Click "Share" → "Invite"
   - Search for your integration name and invite it

## Supported Page Formats

The CLI accepts both page IDs and URLs:

- **Page ID**: `12345678901234567890123456789012`
- **Page ID with hyphens**: `12345678-9012-3456-7890-123456789012`
- **Notion URL**: `https://www.notion.so/Page-Title-12345678901234567890123456789012`

## Error Handling

The CLI provides clear error messages for common issues:

- Invalid page ID or URL format
- Invalid or expired Notion API token
- Page not found or access denied
- Network connectivity issues

Exit codes:
- `0`: Success
- `1`: Error occurred

## License

Distributed under the MIT License. See [LICENSE](https://github.com/salvage0707/notion-md-converter/blob/main/LICENSE) for more information.

## Author

malvageee (https://github.com/salvage0707)