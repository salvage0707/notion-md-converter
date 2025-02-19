import { type LoadableBlockType, loadBlockContentFixture, loadMdFixture } from "src/test-helper";
import { NotionMarkdownConverter } from "./NotionMarkdownConverter";

describe("NotionMarkdownConverter", () => {
  const converter = new NotionMarkdownConverter();

  const testBlockConversion = (blockType: LoadableBlockType) => {
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
  const blockTypes: LoadableBlockType[] = [
    "bookmark",
    "breadcrumb",
    "bulleted_list_item",
    "callout",
    "child_database",
    "child_page",
    "code",
    "column_list",
    "divider",
    "embed",
    "equation",
    "file",
    "heading",
    "image",
    "link_preview",
    "numbered_list_item",
    "paragraph",
  ];

  // 各ブロックタイプのテストを実行
  for (const blockType of blockTypes) {
    testBlockConversion(blockType);
  }
});
