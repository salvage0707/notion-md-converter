import { $getDatabasePages, $getPageFullContent } from "@notion-md-converter/core";
import { NotionMarkdownConverter } from "@notion-md-converter/core";
import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const client = new Client({
    auth: process.env.NOTION_API_SECRET,
  });

  // Helper function to get all database pages
  const pages = await $getDatabasePages(client, process.env.NOTION_DATABASE_ID as string);

  const contents = [];
  for (const page of pages) {
    if (page.object !== "page") {
      continue;
    }

    const content = await $getPageFullContent(client, page.id);

    const executor = new NotionMarkdownConverter();
    const result = executor.execute(content);

    contents.push(result);
    console.log("converted", page.id);
  }

  for (const content of contents) {
    console.log("--------------------------------");
    console.log(content);
  }
}

main();
