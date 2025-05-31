# @notion-md-converter/mcp

MCP (Model Context Protocol) server for Notion to Markdown conversion.

## Overview

This package provides an MCP server that exposes the functionality of `@notion-md-converter/core` to AI assistants, enabling them to convert Notion content to Markdown directly.

## Installation

```bash
npm install @notion-md-converter/mcp
```

## Usage

### Running the MCP Server

```bash
# Start the MCP server
npx @notion-md-converter/mcp

# Or with environment variable
NOTION_TOKEN=your-token npx @notion-md-converter/mcp
```

### Available Tools

#### `convertNotionToMarkdown`

Converts a Notion page to Markdown format.

**Input Schema:**
- `notionId` (string, required): Notion page ID or URL
- `notionToken` (string, optional): Notion API token (can also use NOTION_TOKEN environment variable)

**Example:**
```json
{
  "tool": "convertNotionToMarkdown",
  "arguments": {
    "notionId": "abc123def456",
    "notionToken": "secret_xxx"
  }
}
```

**Output:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "# Page Title\n\nConverted markdown content..."
    }
  ]
}
```

## Configuration

### Environment Variables

- `NOTION_TOKEN`: Your Notion API token (optional, can be passed as argument)

## Error Handling

The server handles common errors gracefully:
- Notion API errors
- Page not found
- Permission errors

Errors are returned in the standard MCP format within the content array.

## License

MIT