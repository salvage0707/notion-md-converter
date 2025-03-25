import { CHAR, dedent } from "@notion-md-converter/testing";
import { HatenaBlogMarkdownUtils } from "./markdown";

describe("blockquote", () => {
  it("テキストを引用に変換できること", () => {
    expect(HatenaBlogMarkdownUtils.blockquote("Quote")).toBe(dedent`
      > Quote
      <!------->
    `);
  });

  it("空文字を引用に変換できること", () => {
    expect(HatenaBlogMarkdownUtils.blockquote("")).toBe(dedent`
      >${CHAR.SPACE}
      <!------->
    `);
  });

  it("改行を含むテキストを引用に変換できること", () => {
    expect(HatenaBlogMarkdownUtils.blockquote("Line 1\nLine 2\nLine 3")).toBe(dedent`
      > Line 1
      > Line 2
      > Line 3
      <!------->
    `);
  });
});
