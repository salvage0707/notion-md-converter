import {
  $getPageFullContent,
  NotionMarkdownConverter,
  extractPageId,
} from "@notion-md-converter/core";
import { Command } from "commander";
import { createNotionClient } from "../utils/notion.js";
import { outputMarkdown } from "../utils/output.js";

export const convertCommand = new Command("convert")
  .description("Convert a Notion page to Markdown")
  .requiredOption("-p, --page <pageId>", "Notion page ID or URL")
  .requiredOption("-t, --token <token>", "Notion API token")
  .action(async (options) => {
    try {
      const { page, token } = options;

      console.log("[INFO] Starting conversion...");
      const pageId = extractPageId(page);
      const notionClient = createNotionClient(token);

      console.log("[INFO] Fetching page content from Notion...");
      const content = await $getPageFullContent(notionClient, pageId);

      console.log("[INFO] Converting to Markdown...");
      const converter = new NotionMarkdownConverter();
      const result = converter.execute(content);

      console.log("[INFO] Outputting result...");
      console.log("");
      console.log("");
      outputMarkdown(result);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : "Unknown error");
      process.exit(1);
    }
  });
