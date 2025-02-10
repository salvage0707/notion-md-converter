import { MarkdownUtils, type TableCell, type TableHeader } from "./markdown";

describe("heading", () => {
  it("レベル1の見出しに変換できること", () => {
    expect(MarkdownUtils.heading("Hello", 1)).toBe("# Hello");
  });

  it("レベル2の見出しに変換できること", () => {
    expect(MarkdownUtils.heading("Hello", 2)).toBe("## Hello");
  });

  it("レベル3の見出しに変換できること", () => {
    expect(MarkdownUtils.heading("Hello", 3)).toBe("### Hello");
  });

  it("レベル4の見出しに変換できること", () => {
    expect(MarkdownUtils.heading("Hello", 4)).toBe("#### Hello");
  });

  it("レベル5の見出しに変換できること", () => {
    expect(MarkdownUtils.heading("Hello", 5)).toBe("##### Hello");
  });

  it("レベル6の見出しに変換できること", () => {
    expect(MarkdownUtils.heading("Hello", 6)).toBe("###### Hello");
  });
});

describe("bold", () => {
  it("テキストを太字に変換できること", () => {
    expect(MarkdownUtils.bold("Hello")).toBe("**Hello**");
  });

  it("空文字を太字に変換できること", () => {
    expect(MarkdownUtils.bold("")).toBe("****");
  });
});

describe("convertToItalic", () => {
  it("テキストをイタリックに変換できること", () => {
    expect(MarkdownUtils.convertToItalic("Hello")).toBe("*Hello*");
  });

  it("空文字をイタリックに変換できること", () => {
    expect(MarkdownUtils.convertToItalic("")).toBe("**");
  });
});

describe("convertToStrikethrough", () => {
  it("テキストを取り消し線付きに変換できること", () => {
    expect(MarkdownUtils.convertToStrikethrough("Hello")).toBe("~~Hello~~");
  });

  it("空文字を取り消し線付きに変換できること", () => {
    expect(MarkdownUtils.convertToStrikethrough("")).toBe("~~~~");
  });
});

describe("convertToInlineCode", () => {
  it("テキストをインラインコードに変換できること", () => {
    expect(MarkdownUtils.convertToInlineCode("code")).toBe("`code`");
  });

  it("空文字をインラインコードに変換できること", () => {
    expect(MarkdownUtils.convertToInlineCode("")).toBe("``");
  });
});

describe("convertToBulletList", () => {
  it("デフォルトスタイル（ハイフン）で箇条書きに変換できること", () => {
    expect(MarkdownUtils.convertToBulletList("Item")).toBe("- Item");
  });

  it("アスタリスクスタイルで箇条書きに変換できること", () => {
    expect(MarkdownUtils.convertToBulletList("Item", "*")).toBe("* Item");
  });

  it("プラススタイルで箇条書きに変換できること", () => {
    expect(MarkdownUtils.convertToBulletList("Item", "+")).toBe("+ Item");
  });
});

describe("convertToNumberedList", () => {
  it("番号付きリストに変換できること", () => {
    expect(MarkdownUtils.convertToNumberedList("First item", 1)).toBe(
      "1. First item"
    );
    expect(MarkdownUtils.convertToNumberedList("Second item", 2)).toBe(
      "2. Second item"
    );
  });
});

describe("convertToCheckList", () => {
  it("チェック済みのチェックリストに変換できること", () => {
    expect(MarkdownUtils.convertToCheckList("Task", true)).toBe("- [x] Task");
  });

  it("未チェックのチェックリストに変換できること", () => {
    expect(MarkdownUtils.convertToCheckList("Task", false)).toBe("- [ ] Task");
  });
});

describe("convertToLink", () => {
  it("テキストとURLからリンクに変換できること", () => {
    expect(MarkdownUtils.convertToLink("Text", "https://example.com")).toBe(
      "[Text](https://example.com)"
    );
  });

  it("空のテキストとURLからリンクに変換できること", () => {
    expect(MarkdownUtils.convertToLink("", "https://example.com")).toBe(
      "[](https://example.com)"
    );
  });
});

describe("convertToReferenceLink", () => {
  it("参照リンクに変換できること", () => {
    expect(
      MarkdownUtils.convertToReferenceLink("Text", "1", "https://example.com")
    ).toBe("[Text][1]\n[1]: https://example.com");
  });
});

describe("convertToCodeBlock", () => {
  it("言語指定ありでコードブロックに変換できること", () => {
    expect(MarkdownUtils.convertToCodeBlock("const x = 1;", "typescript")).toBe(
      "```typescript\nconst x = 1;\n```"
    );
  });

  it("言語指定なしでコードブロックに変換できること", () => {
    expect(MarkdownUtils.convertToCodeBlock("const x = 1;")).toBe(
      "```\nconst x = 1;\n```"
    );
  });

  it("複数行のコードをコードブロックに変換できること", () => {
    expect(MarkdownUtils.convertToCodeBlock("line1\nline2")).toBe(
      "```\nline1\nline2\n```"
    );
  });
});

describe("convertToIndentedCodeBlock", () => {
  it("単一行のテキストをインデント付きコードブロックに変換できること", () => {
    expect(MarkdownUtils.convertToIndentedCodeBlock("code")).toBe("    code");
  });

  it("複数行のテキストをインデント付きコードブロックに変換できること", () => {
    expect(MarkdownUtils.convertToIndentedCodeBlock("line1\nline2")).toBe(
      "    line1\n    line2"
    );
  });
});

describe("convertToBlockquote", () => {
  it("テキストを引用に変換できること", () => {
    expect(MarkdownUtils.convertToBlockquote("Quote")).toBe("> Quote");
  });

  it("空文字を引用に変換できること", () => {
    expect(MarkdownUtils.convertToBlockquote("")).toBe("> ");
  });

  it("改行を含むテキストを引用に変換できること", () => {
    expect(MarkdownUtils.convertToBlockquote("Line 1\nLine 2\nLine 3")).toBe(
      "> Line 1\n> Line 2\n> Line 3"
    );
  });
});

describe("convertToTable", () => {
  it("異なる配置のテーブルに変換できること", () => {
    const headers: TableHeader[] = [
      { content: "Left", alignment: "left" },
      { content: "Center", alignment: "center" },
      { content: "Right", alignment: "right" },
    ];
    const rows: TableCell[][] = [
      [{ content: "1" }, { content: "2" }, { content: "3" }],
      [{ content: "4" }, { content: "5" }, { content: "6" }],
    ];

    const expected = [
      "| Left | Center | Right |",
      "| :--- | :----: | ----: |",
      "| 1    | 2      | 3     |",
      "| 4    | 5      | 6     |",
    ].join("\n");

    expect(MarkdownUtils.convertToTable(headers, rows)).toBe(expected);
  });

  it("配置指定なしのテーブルに変換できること", () => {
    const headers: TableHeader[] = [
      { content: "Header1" },
      { content: "Header2" },
    ];
    const rows: TableCell[][] = [[{ content: "1" }, { content: "2" }]];

    const expected = [
      "| Header1 | Header2 |",
      "| ------- | ------- |",
      "| 1       | 2       |",
    ].join("\n");

    expect(MarkdownUtils.convertToTable(headers, rows)).toBe(expected);
  });

  it("データ行がない場合は、ヘッダーとセパレータ行のみを返すこと", () => {
    const headers: TableHeader[] = [
      { content: "Header1" },
      { content: "Header2" },
    ];
    const rows: TableCell[][] = [];

    const expected = [
      "| Header1 | Header2 |", // Header
      "| ------- | ------- |", // Separator
    ].join("\n");

    expect(MarkdownUtils.convertToTable(headers, rows)).toBe(expected);
  });
});

describe("convertToHorizontalRule", () => {
  it("デフォルトスタイル（ハイフン）で水平線に変換できること", () => {
    expect(MarkdownUtils.convertToHorizontalRule()).toBe("---");
  });

  it("ハイフンスタイルで水平線に変換できること", () => {
    expect(MarkdownUtils.convertToHorizontalRule("hyphen")).toBe("---");
  });

  it("アスタリスクスタイルで水平線に変換できること", () => {
    expect(MarkdownUtils.convertToHorizontalRule("asterisk")).toBe("***");
  });

  it("アンダースコアスタイルで水平線に変換できること", () => {
    expect(MarkdownUtils.convertToHorizontalRule("underscore")).toBe("___");
  });
});

describe("wrapWithNewLines", () => {
  it("should wrap text with newlines", () => {
    const text = "Hello, world!";
    expect(MarkdownUtils.wrapWithNewLines(text)).toBe("\nHello, world!\n");
  });

  it("should wrap empty string with newlines", () => {
    expect(MarkdownUtils.wrapWithNewLines("")).toBe("\n\n");
  });

  it("should wrap text that already contains newlines", () => {
    const text = "Line 1\nLine 2";
    expect(MarkdownUtils.wrapWithNewLines(text)).toBe("\nLine 1\nLine 2\n");
  });
});
