import { $getDatabasePages, $getPageFullContent } from "@notion-md-converter/core";
import { NotionZennMarkdownConverter } from "@notion-md-converter/zenn";
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { requiredEnvCheck } from "src/utils/dotenv";
import { writeFile, writeJsonFile } from "src/utils/file";

async function main() {
  requiredEnvCheck(["NOTION_API_SECRET", "EXAMPLE_ZENN_DATABASE_ID"]);

  const databaseId = process.env.EXAMPLE_ZENN_DATABASE_ID as string;
  const client = new Client({
    auth: process.env.NOTION_API_SECRET,
  });

  const pages = await $getDatabasePages(client, databaseId);

  let allContent = "";
  for (const page of pages) {
    if (page.object !== "page") {
      continue;
    }

    const content = await $getPageFullContent(client, page.id);
    const executor = new NotionZennMarkdownConverter();
    const result = executor.execute(content);
    const p = page as PageObjectResponse;
    const titleProperty = p.properties["名前" as keyof typeof p.properties];
    const title =
      titleProperty?.type === "title" && titleProperty.title.length > 0
        ? titleProperty.title.map((t) => t.plain_text).join("")
        : "";
    const filePrefix = title.replace(/ /g, "-");
    console.log("exporting", filePrefix);
    writeJsonFile({
      dir: "examples/zenn",
      filePath: `${filePrefix}-content.json`,
      jsonText: content,
    });
    writeFile({
      dir: "examples/zenn",
      filePath: `${filePrefix}-output.md`,
      content: result,
    });

    allContent += `## ${title}\n\n${result}\n\n`;
  }

  writeFile({
    dir: "examples/zenn",
    filePath: "all-output.md",
    content: allContent,
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
