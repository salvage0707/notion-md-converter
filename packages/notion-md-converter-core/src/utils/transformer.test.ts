import type { RichText } from "@notion-md-converter/types";
import { TransformerUtils } from "./transformer";

describe("getCaptionMetadata", () => {
  const createRichText = (text: string): RichText[] => [
    {
      type: "text",
      text: { content: text, link: null },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      plain_text: text,
      href: null,
    },
  ];

  it("メタデータがない場合、空のメタデータとテキストを返す", () => {
    const caption = createRichText("some text");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: {},
      text: "some text",
    });
  });

  it("IDのみのメタデータがある場合、IDとテキストを返す", () => {
    const caption = createRichText("id=1234567890:some text");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { id: "1234567890" },
      text: "some text",
    });
  });

  it("複数のメタデータがある場合、全てのメタデータとテキストを返す", () => {
    const caption = createRichText("id=1234567890&width=100:some text");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { id: "1234567890", width: "100" },
      text: "some text",
    });
  });

  it("テキストが空の場合、空のテキストを返す", () => {
    const caption = createRichText("id=1234567890:");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { id: "1234567890" },
      text: "",
    });
  });

  it("テキストに:が含まれる場合、正しく処理する", () => {
    const caption = createRichText("id=1234567890:text:with:colons");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { id: "1234567890" },
      text: "text:with:colons",
    });
  });

  it("複数のRichTextを結合して処理する", () => {
    const caption = [createRichText("id=1234567890:")[0], createRichText("some text")[0]];
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { id: "1234567890" },
      text: "some text",
    });
  });

  it("値が指定されていないメタデータの場合、undefinedを返す", () => {
    const caption = createRichText("id=&width=100:some text");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { id: undefined, width: "100" },
      text: "some text",
    });
  });

  it("複数の値が指定されていないメタデータの場合、全てundefinedを返す", () => {
    const caption = createRichText("id=&width=:some text");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { id: undefined, width: undefined },
      text: "some text",
    });
  });

  it("メタデータがkey=value以外の場合、undefinedを返す", () => {
    const caption = createRichText("isDisplay:some text");
    const result = TransformerUtils.getCaptionMetadata(caption);
    expect(result).toEqual({
      metadata: { isDisplay: undefined },
      text: "some text",
    });
  });
});

describe("getCaptionText", () => {
  const createRichText = (
    text: string,
    annotations: Partial<RichText["annotations"]> = {},
  ): RichText[] => [
    {
      type: "text",
      text: { content: text, link: null },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
        ...annotations,
      },
      plain_text: text,
      href: null,
    },
  ];

  it("メタデータがない場合、テキストをそのまま返す", () => {
    const caption = createRichText("some text");
    const result = TransformerUtils.getCaptionText(caption);
    expect(result).toBe("some text");
  });

  it("メタデータがある場合、メタデータを除いたテキストを返す", () => {
    const caption = createRichText("id=1234567890:some text");
    const result = TransformerUtils.getCaptionText(caption);
    expect(result).toBe("some text");
  });

  it("テキストに:が含まれる場合、正しく処理する", () => {
    const caption = createRichText("id=1234567890:text:with:colons");
    const result = TransformerUtils.getCaptionText(caption);
    expect(result).toBe("text:with:colons");
  });

  it("テキストが空の場合、空文字を返す", () => {
    const caption = createRichText("id=1234567890:");
    const result = TransformerUtils.getCaptionText(caption);
    expect(result).toBe("");
  });

  it("アノテーション付きのテキストを正しく処理する", () => {
    const caption = createRichText("id=1234567890:some text", { bold: true });
    const result = TransformerUtils.getCaptionText(caption, { bold: true });
    expect(result).toBe("**some text**");
  });

  it("複数のRichTextを結合して処理する", () => {
    const caption = [
      createRichText("id=1234567890:")[0],
      createRichText("some text", { bold: true })[0],
    ];
    const result = TransformerUtils.getCaptionText(caption, { bold: true });
    expect(result).toBe("**some text**");
  });

  it("複数のRichTextでメタデータとテキストのアノテーションがまたがる場合、正しく処理する", () => {
    const caption = [
      createRichText("id=1234567890:some", { strikethrough: true })[0],
      createRichText(" ")[0],
      createRichText("text", { bold: true })[0],
    ];
    const result = TransformerUtils.getCaptionText(caption, { bold: true });
    expect(result).toBe("~~some~~ **text**");
  });
});
