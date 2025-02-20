import { NotionMarkdownConverter } from "./NotionMarkdownConverter";
import { bookmarkFixture, breadcrumbFixture, bulletedListItemFixture, calloutFixture, childDatabaseFixture, childPageFixture, codeFixture, columnListFixture, dividerFixture, embedFixture, equationFixture, fileFixture, headingFixture, imageFixture, linkPreviewFixture, loadMdFixture, numberedListItemFixture, paragraphFixture, pdfFixture, quoteFixture, syncedBlockFixture, tableFixture, toDoFixture, toggleFixture, videoFixture } from "@notion-md-converter/testing";

describe("NotionMarkdownConverter", () => {
  const converter = new NotionMarkdownConverter();

  // const testBlockConversion = (blockType: LoadableBlockType) => {
  //   describe(blockType, () => {
  //     const testData = loadBlockContentFixture(blockType);

  //     for (const data of testData) {
  //       it(`${data.dataType} の変換が正しいこと`, () => {
  //         const block = data.content;
  //         const result = converter.execute(block);

  //         const expected = loadMdFixture(__dirname, blockType, data.dataType);
  //         expect(result).toBe(expected);
  //       });
  //     }
  //   });
  // };

  // テストするブロックタイプの配列
  const blockFixtures = [
    { name: "bookmark", data: bookmarkFixture },
    { name: "breadcrumb", data: breadcrumbFixture },
    { name: "bulleted_list_item", data: bulletedListItemFixture },
    { name: "callout", data: calloutFixture },
    { name: "child_database", data: childDatabaseFixture },
    { name: "child_page", data: childPageFixture },
    { name: "code", data: codeFixture },
    { name: "column_list", data: columnListFixture },
    { name: "divider", data: dividerFixture },
    { name: "embed", data: embedFixture },
    { name: "equation", data: equationFixture },
    { name: "file", data: fileFixture },
    { name: "heading", data: headingFixture },
    { name: "image", data: imageFixture },
    { name: "link_preview", data: linkPreviewFixture },
    { name: "numbered_list_item", data: numberedListItemFixture },
    { name: "paragraph", data: paragraphFixture },
    { name: "pdf", data: pdfFixture },
    { name: "quote", data: quoteFixture },
    { name: "synced_block", data: syncedBlockFixture },
    { name: "table", data: tableFixture },
    { name: "to_do", data: toDoFixture },
    { name: "toggle", data: toggleFixture },
    { name: "video", data: videoFixture },
  ];

  for (const { name, data } of blockFixtures) {
    for (const [key, block] of Object.entries(data)) {
      describe(`${name}:${key}`, () => {
        it(`${name} の変換が正しいこと`, () => {
          const result = converter.execute(block);

          const expected = loadMdFixture(__dirname, name, key);
          expect(result).toBe(expected);
        });
      });
    }
  }
});
