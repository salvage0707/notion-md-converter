import fs from "node:fs";
import path from "node:path";

type BlockFixtureType =
  | "bookmark"
  | "breadcrumb"
  | "bulleted_list_item"
  | "callout"
  | "child_database"
  | "child_page"
  | "code"
  | "column_list"
  | "divider"
  | "embed"
  | "equation"
  | "file"
  | "heading"
  | "image"
  | "link_preview"
  | "numbered_list_item"
  | "paragraph"
  | "pdf"
  | "quote"
  | "synced_block"
  | "table"
  | "to_do"
  | "toggle"
  | "video";

export const loadMdFixture = (dirname: string, blockType: BlockFixtureType | string, fileName: string) => {
  const mdPath = path.join(dirname, `__fixtures__/${blockType}/${fileName}.md`);
  const expected = fs.readFileSync(mdPath, "utf-8");
  return expected;
};
