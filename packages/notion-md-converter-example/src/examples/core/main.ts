import {
  $getPageFullContent,
  NotionMarkdownConverter,
} from "@notion-md-converter/core";
import { Client } from "@notionhq/client";
import { requiredEnvCheck } from "src/utils/dotenv";
import { writeFile, writeJsonFile } from "src/utils/file";

async function main() {
  requiredEnvCheck(["NOTION_API_SECRET", "EXAMPLE_CORE_PAGE_ID"]);

  const pageId = process.env.EXAMPLE_CORE_PAGE_ID as string;
  const client = new Client({
    auth: process.env.NOTION_API_SECRET,
  });

  const content = await $getPageFullContent(client, pageId);

  const executor = new NotionMarkdownConverter();
  const result = executor.execute(content);

  writeJsonFile({
    dir: "examples/core",
    filePath: "content.json",
    jsonText: content,
  });
  writeFile({
    dir: "examples/core",
    filePath: "output.md",
    content: result,
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
