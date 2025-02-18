import { loadBlockContentFixture, loadMdFixture } from "src/test-helper";
import { NotionMarkdownConverter } from "./NotionMarkdownConverter";
import type { RootBlockType } from "src/types/notion";

describe("NotionMarkdownConverter", () => {
  const converter = new NotionMarkdownConverter();

  const testBlockConversion = (blockType: RootBlockType) => {
    describe(blockType, () => {
      const testData = loadBlockContentFixture(blockType);

      for (const data of testData) {
        it(`${data.dataType} の変換が正しいこと`, () => {
          const block = data.content;
          const result = converter.execute(block);

          const expected = loadMdFixture(__dirname, blockType, data.dataType);
          expect(result).toBe(expected);
        });
      }
    });
  };

  // テストするブロックタイプの配列
  const blockTypes: RootBlockType[] = [
    "bookmark",
    "breadcrumb",
    "bulleted_list_item",
    "callout",
    "child_database",
    "child_page",
    "code",
    "column_list",
  ];

  // 各ブロックタイプのテストを実行
  for (const blockType of blockTypes) {
    testBlockConversion(blockType);
  }
});
