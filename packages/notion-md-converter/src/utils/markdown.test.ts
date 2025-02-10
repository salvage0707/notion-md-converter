import { MarkdownUtils, type TableCell, type TableHeader } from "./markdown";
import type { RichText } from "../types";
import { createTextRichText } from "src/test-helper";

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

describe("italic", () => {
  it("テキストをイタリックに変換できること", () => {
    expect(MarkdownUtils.italic("Hello")).toBe("*Hello*");
  });

  it("空文字をイタリックに変換できること", () => {
    expect(MarkdownUtils.italic("")).toBe("**");
  });
});

describe("strikethrough", () => {
  it("テキストを取り消し線付きに変換できること", () => {
    expect(MarkdownUtils.strikethrough("Hello")).toBe("~~Hello~~");
  });

  it("空文字を取り消し線付きに変換できること", () => {
    expect(MarkdownUtils.strikethrough("")).toBe("~~~~");
  });
});

describe("underline", () => {
  it("テキストを下線付きに変換できること", () => {
    expect(MarkdownUtils.underline("Hello")).toBe("_Hello_");
  });

  it("空文字を下線付きに変換できること", () => {
    expect(MarkdownUtils.underline("")).toBe("__");
  });
});

describe("inlineCode", () => {
  it("テキストをインラインコードに変換できること", () => {
    expect(MarkdownUtils.inlineCode("code")).toBe("`code`");
  });

  it("空文字をインラインコードに変換できること", () => {
    expect(MarkdownUtils.inlineCode("")).toBe("``");
  });
});

describe("bulletList", () => {
  it("デフォルトスタイル（ハイフン）で箇条書きに変換できること", () => {
    expect(MarkdownUtils.bulletList("Item")).toBe("- Item");
  });

  it("アスタリスクスタイルで箇条書きに変換できること", () => {
    expect(MarkdownUtils.bulletList("Item", "*")).toBe("* Item");
  });

  it("プラススタイルで箇条書きに変換できること", () => {
    expect(MarkdownUtils.bulletList("Item", "+")).toBe("+ Item");
  });
});

describe("numberedList", () => {
  it("番号付きリストに変換できること", () => {
    expect(MarkdownUtils.numberedList("First item", 1)).toBe("1. First item");
    expect(MarkdownUtils.numberedList("Second item", 2)).toBe("2. Second item");
  });
});

describe("checkList", () => {
  it("チェック済みのチェックリストに変換できること", () => {
    expect(MarkdownUtils.checkList("Task", true)).toBe("- [x] Task");
  });

  it("未チェックのチェックリストに変換できること", () => {
    expect(MarkdownUtils.checkList("Task", false)).toBe("- [ ] Task");
  });
});

describe("link", () => {
  it("テキストとURLからリンクに変換できること", () => {
    expect(MarkdownUtils.link("Text", "https://example.com")).toBe(
      "[Text](https://example.com)"
    );
  });

  it("空のテキストとURLからリンクに変換できること", () => {
    expect(MarkdownUtils.link("", "https://example.com")).toBe(
      "[](https://example.com)"
    );
  });
});

describe("color", () => {
  it("赤色のテキストに変換できること", () => {
    expect(MarkdownUtils.color("Hello", "red")).toBe(
      '<span style="color: red">Hello</span>'
    );
  });

  it("青色のテキストに変換できること", () => {
    expect(MarkdownUtils.color("World", "blue")).toBe(
      '<span style="color: blue">World</span>'
    );
  });

  it("背景色付きのテキストに変換できること", () => {
    expect(MarkdownUtils.color("Test", "green_background")).toBe(
      '<span style="color: green">Test</span>'
    );
  });

  it("空文字列を色付きテキストに変換できること", () => {
    expect(MarkdownUtils.color("", "purple")).toBe(
      '<span style="color: purple"></span>'
    );
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

describe("convertToImage", () => {
  it("画像に変換できること", () => {
    expect(
      MarkdownUtils.convertToImage("alt text", "https://example.com/image.png")
    ).toBe("![alt text](https://example.com/image.png)");
  });

  it("空のテキストと空のURLを処理できること", () => {
    expect(MarkdownUtils.convertToImage("", "")).toBe("![]()");
  });
});

describe("indent", () => {
  it("単一行のテキストをインデントできること", () => {
    expect(MarkdownUtils.indent("text")).toBe("  text");
  });

  it("複数行のテキストをインデントできること", () => {
    expect(MarkdownUtils.indent("line1\nline2")).toBe("  line1\n  line2");
  });

  it("カスタムスペース数でインデントできること", () => {
    expect(MarkdownUtils.indent("text", 4)).toBe("    text");
  });

  it("空文字列をインデントできること", () => {
    expect(MarkdownUtils.indent("")).toBe("  ");
  });
});

describe("convertToDetails", () => {
  it("基本的なdetailsタグを生成できること", () => {
    const expected = [
      "<details>",
      "  <summary>",
      "    Title",
      "  </summary>",
      "",
      "  Content",
      "</details>",
    ].join("\n");
    expect(MarkdownUtils.convertToDetails("Title", "Content")).toBe(expected);
  });

  it("複数行のコンテンツを処理できること", () => {
    const expected = [
      "<details>",
      "  <summary>",
      "    Title",
      "  </summary>",
      "",
      "  Line 1",
      "  Line 2",
      "</details>",
    ].join("\n");
    expect(MarkdownUtils.convertToDetails("Title", "Line 1\nLine 2")).toBe(
      expected
    );
  });
});

describe("convertToVideo", () => {
  it("基本的なvideoタグを生成できること", () => {
    expect(MarkdownUtils.convertToVideo("https://example.com/video.mp4")).toBe(
      '<video controls src="https://example.com/video.mp4"></video>'
    );
  });

  it("空のURLを処理できること", () => {
    expect(MarkdownUtils.convertToVideo("")).toBe(
      '<video controls src=""></video>'
    );
  });
});

describe("convertRichTextsToMarkdown", () => {
  it("単一のリッチテキストを変換できること", () => {
    const richTexts = [
      createTextRichText({
        root: {
          plain_text: "Hello",
        },
      }),
    ] as RichText[];
    expect(MarkdownUtils.convertRichTextsToMarkdown(richTexts)).toBe("Hello");
  });

  it("複数のアノテーションを持つリッチテキストを変換できること", () => {
    const richTexts = [
      createTextRichText({
        root: {
          plain_text: "Hello",
        },
        annotations: {
          bold: true,
          italic: true,
        },
      }),
    ] as RichText[];
    expect(MarkdownUtils.convertRichTextsToMarkdown(richTexts)).toBe(
      "***Hello***"
    );
  });

  it("複数のリッチテキストを結合できること", () => {
    const richTexts = [
      createTextRichText({
        root: {
          plain_text: "Hello",
        },
        annotations: {
          bold: true,
        },
      }),
      createTextRichText({
        root: {
          plain_text: " ",
        },
      }),
      createTextRichText({
        root: {
          plain_text: "World",
        },
        annotations: {
          italic: true,
        },
      }),
    ] as RichText[];
    expect(MarkdownUtils.convertRichTextsToMarkdown(richTexts)).toBe(
      "**Hello** *World*"
    );
  });

  it("アノテーションを無効化できること", () => {
    const richTexts = [
      createTextRichText({
        root: {
          plain_text: "Hello",
        },
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
    expect(
      MarkdownUtils.convertRichTextsToMarkdown(richTexts, enableAnnotations)
    ).toBe("*Hello*");
  });

  it("空のリッチテキスト配列を処理できること", () => {
    expect(MarkdownUtils.convertRichTextsToMarkdown([])).toBe("");
  });

  it("カラーアノテーションを処理できること", () => {
    const richTexts = [
      createTextRichText({
        root: {
          plain_text: "Colored Text",
        },
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
    expect(
      MarkdownUtils.convertRichTextsToMarkdown(richTexts, enableAnnotations)
    ).toBe('<span style="color: red">Colored Text</span>');
  });
});
