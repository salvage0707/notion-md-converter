import { $getPageFullContent, NotionMarkdownConverter } from "@notion-md-converter/core";
import { Command } from "commander";
import { createNotionClient, extractPageId } from "../utils/notion.js";
import { outputMarkdown } from "../utils/output.js";

export const convertCommand = new Command("convert")
  .description("Convert a Notion page to Markdown")
  .requiredOption("-p, --page <pageId>", "Notion page ID or URL")
  .requiredOption("-t, --token <token>", "Notion API token")
  .action(async (options) => {
    try {
      const { page, token } = options;

      const pageId = extractPageId(page);
      const notionClient = createNotionClient(token);

      const content = await $getPageFullContent(notionClient, pageId);

      const converter = new NotionMarkdownConverter();
      const result = converter.execute(content);

      outputMarkdown(result);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : "Unknown error");
      process.exit(1);
    }
  });
