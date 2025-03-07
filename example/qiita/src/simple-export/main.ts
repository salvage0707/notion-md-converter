import { $getPageFullContent } from "@notion-md-converter/core";
import { NotionQiitaMarkdownConverter } from "@notion-md-converter/qiita";
import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const client = new Client({
    auth: process.env.NOTION_API_SECRET,
  });

  const content = await $getPageFullContent(client, process.env.NOTION_PAGE_ID as string);

  const executor = new NotionQiitaMarkdownConverter();
  const result = executor.execute(content);
  console.log(result);
};

main();
