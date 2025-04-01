import { dedent } from "@notion-md-converter/testing";
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

  it("空文字は装飾せずそのまま返すこと", () => {
    expect(MarkdownUtils.bold("")).toBe("");
  });
});

describe("italic", () => {
  it("テキストをイタリックに変換できること", () => {
    expect(MarkdownUtils.italic("Hello")).toBe("*Hello*");
  });

  it("空文字は装飾せずそのまま返すこと", () => {
    expect(MarkdownUtils.italic("")).toBe("");
  });
});

describe("strikethrough", () => {
  it("テキストを取り消し線付きに変換できること", () => {
    expect(MarkdownUtils.strikethrough("Hello")).toBe("~~Hello~~");
  });

  it("空文字は装飾せずそのまま返すこと", () => {
    expect(MarkdownUtils.strikethrough("")).toBe("");
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
    expect(MarkdownUtils.link("Text", "https://example.com")).toBe("[Text](https://example.com)");
  });

  it("空のテキストとURLからリンクに変換できること", () => {
    expect(MarkdownUtils.link("", "https://example.com")).toBe("[](https://example.com)");
  });
});

describe("color", () => {
  it("赤色のテキストに変換できること", () => {
    const redColor = MarkdownUtils.COLOR_MAP.red as string;
    expect(MarkdownUtils.color("Hello", "red")).toBe(
      `<span style="color: ${redColor};">Hello</span>`,
    );
  });

  it("青色のテキストに変換できること", () => {
    const blueColor = MarkdownUtils.COLOR_MAP.blue as string;
    expect(MarkdownUtils.color("World", "blue")).toBe(
      `<span style="color: ${blueColor};">World</span>`,
    );
  });

  it("背景色付きのテキストに変換できること", () => {
    const greenBgColor = MarkdownUtils.COLOR_MAP.green_background as string;
    expect(MarkdownUtils.color("Test", "green_background")).toBe(
      `<span style="background-color: ${greenBgColor};">Test</span>`,
    );
  });

  it("空文字列を空のテキストに変換できること", () => {
    expect(MarkdownUtils.color("", "purple")).toBe("");
  });
});

describe("codeBlock", () => {
  it("言語指定ありでコードブロックに変換できること", () => {
    expect(MarkdownUtils.codeBlock("const x = 1;", "typescript")).toBe(
      "```typescript\nconst x = 1;\n```",
    );
  });

  it("言語指定なしでコードブロックに変換できること", () => {
    expect(MarkdownUtils.codeBlock("const x = 1;")).toBe("```\nconst x = 1;\n```");
  });

  it("複数行のコードをコードブロックに変換できること", () => {
    expect(MarkdownUtils.codeBlock("line1\nline2")).toBe("```\nline1\nline2\n```");
  });
});

describe("blockquote", () => {
  it("テキストを引用に変換できること", () => {
    expect(MarkdownUtils.blockquote("Quote")).toBe("> Quote");
  });

  it("空文字を引用に変換できること", () => {
    expect(MarkdownUtils.blockquote("")).toBe("> ");
  });

  it("改行を含むテキストを引用に変換できること", () => {
    expect(MarkdownUtils.blockquote("Line 1\nLine 2\nLine 3")).toBe("> Line 1\n> Line 2\n> Line 3");
  });
});

describe("table", () => {
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

    expect(MarkdownUtils.table(headers, rows)).toBe(expected);
  });

  it("配置指定なしのテーブルに変換できること", () => {
    const headers: TableHeader[] = [{ content: "Header1" }, { content: "Header2" }];
    const rows: TableCell[][] = [[{ content: "1" }, { content: "2" }]];

    const expected = [
      "| Header1 | Header2 |",
      "| ------- | ------- |",
      "| 1       | 2       |",
    ].join("\n");

    expect(MarkdownUtils.table(headers, rows)).toBe(expected);
  });

  it("データ行がない場合は、ヘッダーとセパレータ行のみを返すこと", () => {
    const headers: TableHeader[] = [{ content: "Header1" }, { content: "Header2" }];
    const rows: TableCell[][] = [];

    const expected = [
      "| Header1 | Header2 |", // Header
      "| ------- | ------- |", // Separator
    ].join("\n");

    expect(MarkdownUtils.table(headers, rows)).toBe(expected);
  });
});

describe("horizontalRule", () => {
  it("デフォルトスタイル（ハイフン）で水平線に変換できること", () => {
    expect(MarkdownUtils.horizontalRule()).toBe("---");
  });

  it("ハイフンスタイルで水平線に変換できること", () => {
    expect(MarkdownUtils.horizontalRule("hyphen")).toBe("---");
  });

  it("アスタリスクスタイルで水平線に変換できること", () => {
    expect(MarkdownUtils.horizontalRule("asterisk")).toBe("***");
  });

  it("アンダースコアスタイルで水平線に変換できること", () => {
    expect(MarkdownUtils.horizontalRule("underscore")).toBe("___");
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

describe("image", () => {
  it("テキストとURLから画像に変換できること", () => {
    expect(MarkdownUtils.image("Alt text", "https://example.com/image.jpg")).toBe(
      "![Alt text](https://example.com/image.jpg)",
    );
  });

  it("空のテキストとURLから画像に変換できること", () => {
    expect(MarkdownUtils.image("", "https://example.com/image.jpg")).toBe(
      "![](https://example.com/image.jpg)",
    );
  });

  it("幅指定ありで画像に変換できること", () => {
    expect(MarkdownUtils.image("Alt text", "https://example.com/image.jpg", { width: "100" })).toBe(
      "![Alt text](https://example.com/image.jpg =100x)",
    );
  });
});

describe("details", () => {
  it("タイトルと内容からdetailsタグに変換できること", () => {
    expect(MarkdownUtils.details("Title", "Content")).toBe(dedent`
      <details>
      <summary>
      Title
      </summary>

      Content
      </details>
    `);
  });

  it("空のタイトルと内容からdetailsタグに変換できること", () => {
    expect(MarkdownUtils.details("", "")).toBe(dedent`
    <details>
    <summary>

    </summary>


    </details>
    `);
  });
});

describe("blockEquation", () => {
  it("数式を正しく変換できること", () => {
    expect(MarkdownUtils.blockEquation("E = mc^2")).toBe("$$\nE = mc^2\n$$");
  });

  it("複数行の数式を正しく変換できること", () => {
    expect(MarkdownUtils.blockEquation("f(x) = ax^2 + bx + c\ny = 2x + 1")).toBe(
      "$$\nf(x) = ax^2 + bx + c\ny = 2x + 1\n$$",
    );
  });

  it("空文字列を数式に変換できること", () => {
    expect(MarkdownUtils.blockEquation("")).toBe("$$\n\n$$");
  });
});

describe("inlineEquation", () => {
  it("数式を正しく変換できること", () => {
    expect(MarkdownUtils.inlineEquation("E = mc^2")).toBe("$E = mc^2$");
  });

  it("複数の変数を含む数式を正しく変換できること", () => {
    expect(MarkdownUtils.inlineEquation("x^2 + y^2 = r^2")).toBe("$x^2 + y^2 = r^2$");
  });

  it("空文字列を数式に変換できること", () => {
    expect(MarkdownUtils.inlineEquation("")).toBe("$$");
  });
});

describe("comment", () => {
  it("テキストをHTMLコメントに変換できること", () => {
    expect(MarkdownUtils.comment("This is a comment")).toBe("<!-- This is a comment -->");
  });

  it("空文字をHTMLコメントに変換できること", () => {
    expect(MarkdownUtils.comment("")).toBe("<!--  -->");
  });

  it("特殊文字を含むテキストをHTMLコメントに変換できること", () => {
    expect(MarkdownUtils.comment("<script>alert('test')</script>")).toBe(
      "<!-- <script>alert('test')</script> -->",
    );
  });
});

describe("decoration", () => {
  it("通常のテキストを装飾できること", () => {
    expect(MarkdownUtils.decoration("Hello", { decoration: "**" })).toBe("**Hello**");
  });

  it("前後に空白があるテキストを装飾できること", () => {
    expect(MarkdownUtils.decoration("  Hello  ", { decoration: "**" })).toBe("  **Hello**  ");
  });

  it("前に空白があるテキストを装飾できること", () => {
    expect(MarkdownUtils.decoration("  Hello", { decoration: "**" })).toBe("  **Hello**");
  });

  it("後に空白があるテキストを装飾できること", () => {
    expect(MarkdownUtils.decoration("Hello  ", { decoration: "**" })).toBe("**Hello**  ");
  });

  it("間に空白があるテキストを装飾できること", () => {
    expect(MarkdownUtils.decoration("Hello World", { decoration: "**" })).toBe("**Hello World**");
  });

  it("複数の空白を含むテキストを装飾できること", () => {
    expect(MarkdownUtils.decoration("Hello  World", { decoration: "**" })).toBe("**Hello  World**");
  });

  it("空文字列は装飾せずそのまま返すこと", () => {
    expect(MarkdownUtils.decoration("", { decoration: "**" })).toBe("");
  });

  it("空白のみの文字列は装飾せずそのまま返すこと", () => {
    expect(MarkdownUtils.decoration("   ", { decoration: "**" })).toBe("   ");
  });

  it("特殊文字を含むテキストを装飾できること", () => {
    expect(MarkdownUtils.decoration("Hello, World!", { decoration: "**" })).toBe(
      "**Hello, World!**",
    );
  });

  // italicとboldが同時に適用される場合を考慮して
  it("同じ装飾で始まるテキストでも装飾がつくこと", () => {
    expect(MarkdownUtils.decoration("**Hello**", { decoration: "*" })).toBe("***Hello***");
  });
});
