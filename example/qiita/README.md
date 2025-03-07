# @notion-md-converter/qiita Usage Examples

This directory contains examples demonstrating how to use the @notion-md-converter/qiita library. The examples show how to convert Notion content to Qiita-compatible Markdown format.

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

## Examples

### Simple Export

A basic example showing how to export Notion content to Qiita-compatible Markdown format. This example demonstrates the fundamental usage of the library.

```sh
# Run the simple export example
$ pnpm run qiita:simple-export
```