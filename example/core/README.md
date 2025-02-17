# Notion to Markdown Converter Examples

## Prerequisites

1. **Environment Variables Setup**
   Copy the `.env.example` file to `.env` and set the following variables:
   ```
   NOTION_API_SECRET=your_notion_api_secret
   NOTION_PAGE_ID=your_notion_page_id
   ```
   - `NOTION_API_SECRET`: Your Notion API integration token ([Get your token here](https://developers.notion.com/docs/authorization#internal-integration-auth-flow-set-up))
   - `NOTION_PAGE_ID`: The ID of the Notion page you want to convert

2. **Install Dependencies**
   ```sh
   $ pnpm install
   ```

## @notion-md-converter/core

This directory contains examples demonstrating how to use the @notion-md-converter/core library. The examples show various ways to convert Notion content to Markdown format.

### Directory Structure

```
src/
  ├── simple-export/      # Basic example of exporting Notion content to Markdown
  └── custom-export/      # Example of customizing the Markdown conversion process
```

### Examples

#### Simple Export
A basic example showing how to export Notion content to Markdown format. This example demonstrates the fundamental usage of the library.

```sh
# Run the simple export example
$ pnpm run core:simple-export
```

#### Custom Export
An example demonstrating how to customize the Markdown conversion process. This example shows how to create and use custom transformers to modify the output format.

```sh
# Run the custom export example
$ pnpm run core:custom-export
```