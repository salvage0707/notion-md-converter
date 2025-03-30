import { createEquationRichText, createTextRichText } from "@notion-md-converter/testing";
import type { RichText } from "@notion-md-converter/types";
import { BasicRichTextFormatter } from "./BasicRichTextFormatter";

describe("BasicRichTextFormatter", () => {
  describe("format", () => {
    let formatter: BasicRichTextFormatter;

    beforeEach(() => {
      formatter = new BasicRichTextFormatter();
    });

    it("単一のリッチテキストを変換できること", () => {
      const richTexts = [
        createTextRichText({
          content: "Hello",
        }),
      ] as RichText[];
      expect(formatter.format(richTexts)).toBe("Hello");
    });

    it("複数のアノテーションを持つリッチテキストを変換できること", () => {
      const richTexts = [
        createTextRichText({
          content: "Hello",
          annotations: {
            bold: true,
            italic: true,
          },
        }),
      ] as RichText[];
      expect(formatter.format(richTexts)).toBe("***Hello***");
    });

    it("複数のリッチテキストを結合できること", () => {
      const richTexts = [
        createTextRichText({
          content: "Hello",
          annotations: {
            bold: true,
          },
        }),
        createTextRichText({
          content: " ",
        }),
        createTextRichText({
          content: "World",
          annotations: {
            italic: true,
          },
        }),
      ] as RichText[];
      expect(formatter.format(richTexts)).toBe("**Hello** *World*");
    });

    it("アノテーションを無効化できること", () => {
      const richTexts = [
        createTextRichText({
          content: "Hello",
          annotations: {
            bold: true,
            italic: true,
          },
        }),
      ];
      const enableAnnotations = {
        bold: false,
        italic: true,
        strikethrough: false,
        underline: false,
        code: false,
        color: false,
      };
      expect(formatter.format(richTexts, enableAnnotations)).toBe("*Hello*");
    });

    it("空のリッチテキスト配列を処理できること", () => {
      expect(formatter.format([])).toBe("");
    });

    it("色のアノテーションが有効な場合、色付きのテキストを処理できること", () => {
      const richTexts = [
        createTextRichText({
          content: "Colored Text",
          annotations: {
            color: "red",
          },
        }),
      ] as RichText[];
      const enableAnnotations = {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: true,
      };
      const formatter = new BasicRichTextFormatter();
      expect(formatter.format(richTexts, enableAnnotations)).toBe(
        `<span style="color: #A83232;">Colored Text</span>`,
      );
    });

    it("インライン数式を処理できること", () => {
      const richTexts = [
        createEquationRichText({
          expression: "E = mc^2",
        }),
      ] as RichText[];
      expect(formatter.format(richTexts)).toBe("$E = mc^2$");
    });

    it("太字のインライン数式を処理できること", () => {
      const richTexts = [
        createEquationRichText({
          expression: "E = mc^2",
          annotations: {
            bold: true,
          },
        }),
      ] as RichText[];
      expect(formatter.format(richTexts)).toBe("**$E = mc^2$**");
    });

    it("リンクのテキストを処理できること", () => {
      const richTexts = [
        createTextRichText({ content: "Link", href: "https://example.com" }),
      ] as RichText[];
      expect(formatter.format(richTexts)).toBe("[Link](https://example.com)");
    });

    it("URL形式ではないリンクのテキストを処理できること", () => {
      const richTexts = [
        createTextRichText({ content: "Link", href: "/1af2ad69d3ce80b189a5c816f8caaaaa" }),
      ] as RichText[];
      expect(formatter.format(richTexts)).toBe("Link");
    });
  });

  describe("plainText", () => {
    it("リッチテキストをテキストのみに変換できること", () => {
      const richTexts = [
        createTextRichText({ content: "Hello", annotations: { bold: true } }),
        createTextRichText({ content: " World" }),
      ] as RichText[];
      const formatter = new BasicRichTextFormatter();
      expect(formatter.plainText(richTexts)).toBe("Hello World");
    });
  });
});
