import { createTextRichText } from "@notion-md-converter/testing";
import { CaptionMetadata } from "./CaptionMetadata";

describe("CaptionMetadata", () => {
  describe("fromRichText", () => {
    describe("メタデータが存在しない場合", () => {
      it("空のメタデータと元のテキストを含むCaptionMetadataを返すこと", () => {
        const richText = [
          createTextRichText({
            content: "シンプルなテキストです。",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({});
        expect(result.getText()).toEqual(richText);
      });
    });

    describe("メタデータが存在する場合", () => {
      it("単一のメタデータを正しく解析できること", () => {
        const richText = [
          createTextRichText({
            content: "key=value:テキストです",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({ key: "value" });
        expect(result.getText()[0].plain_text).toBe("テキストです");
      });

      it("複数のメタデータを正しく解析できること", () => {
        const richText = [
          createTextRichText({
            content: "key1=value1&key2=value2:テキストです",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({
          key1: "value1",
          key2: "value2",
        });
        expect(result.getText()[0].plain_text).toBe("テキストです");
      });

      it("値が指定されていないメタデータを正しく解析できること", () => {
        const richText = [
          createTextRichText({
            content: "key1=&key2:テキストです",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({
          key1: undefined,
          key2: undefined,
        });
        expect(result.getText()[0].plain_text).toBe("テキストです");
      });

      it("テキストに複数のコロンが含まれる場合も正しく解析できること", () => {
        const richText = [
          createTextRichText({
            content: "key=value:テキスト:コロン:含む",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({ key: "value" });
        expect(result.getText()[0].plain_text).toBe("テキスト:コロン:含む");
      });

      it("テキストが空の場合、空のテキストとメタデータを返すこと", () => {
        const richText = [
          createTextRichText({
            content: "key=value:",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({ key: "value" });
        expect(result.getText()).toEqual([]);
      });
    });

    describe("RichTextの処理", () => {
      it("メタデータ以降のRichTextを正しく抽出できること", () => {
        const richText = [
          createTextRichText({
            content: "key=value:",
          }),
          createTextRichText({
            content: "テキスト部分です",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({ key: "value" });
        expect(result.getText()).toEqual([
          createTextRichText({
            content: "テキスト部分です",
          }),
        ]);
      });

      it("メタデータとテキストの境界をまたぐRichTextを正しく分割できること", () => {
        const richText = [
          createTextRichText({
            content: "key=value:前半",
          }),
          createTextRichText({
            content: "後半",
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({ key: "value" });
        expect(result.getText()).toEqual([
          createTextRichText({
            content: "前半",
          }),
          createTextRichText({
            content: "後半",
          }),
        ]);
      });

      it("テキスト部分のRichTextのannotations（太字、斜体、下線など）が正しく保持されること", () => {
        const richText = [
          createTextRichText({
            content: "key=value:",
          }),
          createTextRichText({
            content: "太字テキスト",
            annotations: { bold: true },
          }),
          createTextRichText({
            content: "斜体テキスト",
            annotations: { italic: true },
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({ key: "value" });
        expect(result.getText()).toEqual([
          createTextRichText({
            content: "太字テキスト",
            annotations: { bold: true },
          }),
          createTextRichText({
            content: "斜体テキスト",
            annotations: { italic: true },
          }),
        ]);
      });

      it("メタデータとテキストの境界をまたぐRichTextでもannotationsが正しく保持されること", () => {
        const richText = [
          createTextRichText({
            content: "key=value:装飾",
            annotations: { bold: true },
          }),
          createTextRichText({
            content: "テキスト",
            annotations: { bold: true },
          }),
        ];

        const result = CaptionMetadata.fromRichText(richText);

        expect(result.getMetadata()).toEqual({ key: "value" });
        expect(result.getText()).toEqual([
          createTextRichText({
            content: "装飾",
            annotations: { bold: true },
          }),
          createTextRichText({
            content: "テキスト",
            annotations: { bold: true },
          }),
        ]);
      });
    });
  });

  describe("getMetadata", () => {
    it("全てのメタデータを取得できること", () => {
      const richText = [
        createTextRichText({
          content: "key1=value1&key2=value2:テキスト",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);
      const metadata = result.getMetadata();

      expect(metadata).toEqual({
        key1: "value1",
        key2: "value2",
      });
    });

    it("メタデータのディープコピーを返すこと", () => {
      const richText = [
        createTextRichText({
          content: "key=value:テキスト",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);
      const metadata1 = result.getMetadata();
      const metadata2 = result.getMetadata();

      expect(metadata1).toEqual(metadata2);
      expect(metadata1).not.toBe(metadata2);
    });
  });

  describe("getText", () => {
    it("テキスト部分のRichTextを取得できること", () => {
      const richText = [
        createTextRichText({
          content: "key=value:",
        }),
        createTextRichText({
          content: "テキスト部分",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);
      const text = result.getText();

      expect(text[0].plain_text).toBe("テキスト部分");
    });

    it("RichTextのディープコピーを返すこと", () => {
      const richText = [
        createTextRichText({
          content: "key=value:テキスト",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);
      const text1 = result.getText();
      const text2 = result.getText();

      expect(text1).toEqual(text2);
      expect(text1).not.toBe(text2);
    });
  });

  describe("getMetadataValue", () => {
    it("指定したキーのメタデータ値を取得できること", () => {
      const richText = [
        createTextRichText({
          content: "key1=value1&key2=value2:テキスト",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);

      expect(result.getMetadataValue("key1")).toBe("value1");
      expect(result.getMetadataValue("key2")).toBe("value2");
    });

    it("存在しないキーの場合undefinedを返すこと", () => {
      const richText = [
        createTextRichText({
          content: "key=value:テキスト",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);

      expect(result.getMetadataValue("nonexistent")).toBeUndefined();
    });
  });

  describe("hasMetadata", () => {
    it("指定したキーのメタデータが存在する場合trueを返すこと", () => {
      const richText = [
        createTextRichText({
          content: "key=value:テキスト",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);

      expect(result.hasMetadata("key")).toBe(true);
    });

    it("指定したキーのメタデータが存在しない場合falseを返すこと", () => {
      const richText = [
        createTextRichText({
          content: "key=value:テキスト",
        }),
      ];

      const result = CaptionMetadata.fromRichText(richText);

      expect(result.hasMetadata("nonexistent")).toBe(false);
    });
  });
});
