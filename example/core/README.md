# @notion-md-converter/core Usage Examples

This directory contains examples demonstrating how to use the @notion-md-converter/core library. The examples show various ways to convert Notion content to Markdown format.

## Prerequisites

1. **Environment Variables Setup**
   Copy the `.env.example` file to `.env` and set the following variables:
   ```
   NOTION_API_SECRET=your_notion_api_secret
   NOTION_PAGE_ID=your_notion_page_id
   NOTION_DATABASE_ID=your_notion_database_id
   ```
   - `NOTION_API_SECRET`: Your Notion API integration token ([Get your token here](https://developers.notion.com/docs/authorization#internal-integration-auth-flow-set-up))
   - `NOTION_PAGE_ID`: The ID of the Notion page you want to convert
   - `NOTION_DATABASE_ID`: The ID of the Notion database you want to export

2. **Install Dependencies**
   ```sh
   $ pnpm install
   ```


## Directory Structure

```
src/
  ├── simple-export/              # Basic example of exporting Notion content to Markdown
  ├── custom-export/             # Example of customizing the Markdown conversion process
  └── database-page-exports/     # Example of exporting all pages from a Notion database
```

## Examples

### Simple Export

A basic example showing how to export Notion content to Markdown format. This example demonstrates the fundamental usage of the library.

```sh
# Run the simple export example
$ pnpm run core:simple-export
```

### Custom Export

An example demonstrating how to customize the Markdown conversion process. This example shows how to create and use custom transformers to modify the output format.

```sh
# Run the custom export example
$ pnpm run core:custom-export
```

### Database Page Exports

An example showing how to export all pages from a Notion database. This example demonstrates how to convert multiple pages by specifying a database ID.

```sh
# Run the database page exports example
$ pnpm run core:database-page-exports
```