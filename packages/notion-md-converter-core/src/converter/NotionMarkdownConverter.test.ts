import { loadBlockContentFixture, loadMdFixture } from "src/test-helper";
import { NotionMarkdownConverter } from "./NotionMarkdownConverter";

describe("NotionMarkdownConverter", () => {
  const converter = new NotionMarkdownConverter();

  describe("bookmark", () => {
    const testData = loadBlockContentFixture("bookmark");

    for (const data of testData) {
      it(`${data.dataType} の変換が正しいこと`, () => {
        const block = data.content;
        const result = converter.execute(block);

        const expected = loadMdFixture(__dirname, "bookmark", data.dataType);
        expect(result).toBe(expected);
      });
    }
  });

  describe("breadcrumb", () => {
    const testData = loadBlockContentFixture("breadcrumb");

    for (const data of testData) {
      it(`${data.dataType} の変換が正しいこと`, () => {
        const block = data.content;
        const result = converter.execute(block);

        const expected = loadMdFixture(__dirname, "breadcrumb", data.dataType);
        expect(result).toBe(expected);
      });
    }
  });

  describe("bulleted_list_item", () => {
    const testData = loadBlockContentFixture("bulleted_list_item");

    for (const data of testData) {
      it(`${data.dataType} の変換が正しいこと`, () => {
        const block = data.content;
        const result = converter.execute(block);

        const expected = loadMdFixture(__dirname, "bulleted_list_item", data.dataType);
        expect(result).toBe(expected);
      });
    }
  });
});
