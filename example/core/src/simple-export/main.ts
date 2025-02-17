import { $getPageFullContent, NotionMarkdownConverter } from "@notion-md-converter/core";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const client = new Client({
    auth: process.env.NOTION_API_SECRET,
  });

  const content = await $getPageFullContent(client, process.env.NOTION_PAGE_ID as string);

  const executor = new NotionMarkdownConverter();
  const result = executor.execute(content);
  console.log(result);
};

main();
