import { ZennMarkdownUtils } from "./markdown";

describe("image", () => {
  it("テキストとURLから画像に変換できること", () => {
    expect(ZennMarkdownUtils.image("Alt text", "https://example.com/image.jpg")).toBe(
      "![Alt text](https://example.com/image.jpg)",
    );
  });

  it("キャプション付きの画像に変換できること", () => {
    expect(ZennMarkdownUtils.image("Alt text", "https://example.com/image.jpg", "Caption")).toBe(
      '![Alt text](https://example.com/image.jpg\n*"Caption")*',
    );
  });
});

describe("codeBlock", () => {
  it("言語指定ありでコードブロックに変換できること", () => {
    expect(ZennMarkdownUtils.codeBlock("const x = 1;", false, "typescript")).toBe("```typescript\nconst x = 1;\n```");
  });

  it("diffモードでコードブロックに変換できること", () => {
    expect(ZennMarkdownUtils.codeBlock("const x = 1;", true, "typescript")).toBe(
      "```diff typescript\nconst x = 1;\n```",
    );
  });

  it("ファイル名付きでコードブロックに変換できること", () => {
    expect(ZennMarkdownUtils.codeBlock("const x = 1;", false, "typescript", "example.ts")).toBe(
      "```typescript:example.ts\nconst x = 1;\n```",
    );
  });
});

describe("details", () => {
  it("通常のdetailsに変換できること", () => {
    expect(ZennMarkdownUtils.details("Title", "Content")).toBe(":::details Title\nContent\n:::");
  });

  it("タイトルと内容を持つdetailsを生成できる", () => {
    const result = ZennMarkdownUtils.details("タイトル", "内容");
    expect(result).toBe(":::details タイトル\n内容\n:::");
  });

  it("タイトルが空の場合、detailsのみを生成する", () => {
    const result = ZennMarkdownUtils.details("", "内容");
    expect(result).toBe(":::details\n内容\n:::");
  });

  it("タイトルに改行が含まれる場合、空白に置換する", () => {
    const result = ZennMarkdownUtils.details("タイトル1\nタイトル2", "内容");
    expect(result).toBe(":::details タイトル1 タイトル2\n内容\n:::");
  });

  it("内容に:::が含まれる場合、::::でラップする", () => {
    const result = ZennMarkdownUtils.details("タイトル", ":::message\n内容\n:::");
    expect(result).toBe("::::details タイトル\n:::message\n内容\n:::\n::::");
  });
});

describe("message", () => {
  it("通常のメッセージに変換できること", () => {
    expect(ZennMarkdownUtils.message("Hello", false)).toBe(":::message\nHello\n:::");
  });

  it("アラートメッセージに変換できること", () => {
    expect(ZennMarkdownUtils.message("Warning", true)).toBe(":::message alert\nWarning\n:::");
  });

  it("内容に:::が含まれる場合、::::でラップする", () => {
    expect(ZennMarkdownUtils.message(":::message\n内容\n:::", false)).toBe("::::message\n:::message\n内容\n:::\n::::");
  });
});

describe("embedLinkCard", () => {
  it("URLをそのまま返すこと", () => {
    expect(ZennMarkdownUtils.embedLinkCard("https://example.com")).toBe("https://example.com");
  });
});

describe("embedX", () => {
  it("URLをそのまま返すこと", () => {
    expect(ZennMarkdownUtils.embedX("https://twitter.com/example")).toBe("https://twitter.com/example");
  });
});

describe("embedYoutube", () => {
  it("URLをそのまま返すこと", () => {
    expect(ZennMarkdownUtils.embedYoutube("https://youtube.com/watch?v=example")).toBe(
      "https://youtube.com/watch?v=example",
    );
  });
});

describe("embedGitHub", () => {
  it("URLをそのまま返すこと", () => {
    expect(ZennMarkdownUtils.embedGitHub("https://github.com/example")).toBe("https://github.com/example");
  });
});

describe("embedGitHubGist", () => {
  it("Gist URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedGitHubGist("https://gist.github.com/example")).toBe(
      "@[gist](https://gist.github.com/example)",
    );
  });
});

describe("embedCodePen", () => {
  it("CodePen URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedCodePen("https://codepen.io/example")).toBe("@[codepen](https://codepen.io/example)");
  });
});

describe("embedSlideShare", () => {
  it("SlideShare URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedSlideShare("https://slideshare.net/example")).toBe(
      "@[slideshare](https://slideshare.net/example)",
    );
  });
});

describe("embedSpeakerDeck", () => {
  it("SpeakerDeck IDを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedSpeakerDeck("example-id")).toBe("@[speakerdeck](example-id)");
  });
});

describe("embedDocSwell", () => {
  it("DocSwell URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedDocSwell("https://docswell.com/example")).toBe(
      "@[docswell](https://docswell.com/example)",
    );
  });
});

describe("embedJSFiddle", () => {
  it("JSFiddle URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedJSFiddle("https://jsfiddle.net/example")).toBe(
      "@[jsfiddle](https://jsfiddle.net/example)",
    );
  });
});

describe("embedCodeSandbox", () => {
  it("CodeSandbox URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedCodeSandbox("https://codesandbox.io/example")).toBe(
      "@[codesandbox](https://codesandbox.io/example)",
    );
  });
});

describe("embedStackBlitz", () => {
  it("StackBlitz URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedStackBlitz("https://stackblitz.com/example")).toBe(
      "@[stackblitz](https://stackblitz.com/example)",
    );
  });
});

describe("embedFigma", () => {
  it("Figma URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedFigma("https://figma.com/example")).toBe("@[figma](https://figma.com/example)");
  });
});

describe("embedBlueprintUE", () => {
  it("BlueprintUE URLを正しい形式に変換できること", () => {
    expect(ZennMarkdownUtils.embedBlueprintUE("https://blueprintue.com/example")).toBe(
      "@[blueprintue](https://blueprintue.com/example)",
    );
  });
});
