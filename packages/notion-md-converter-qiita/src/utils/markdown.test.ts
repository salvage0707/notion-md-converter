import { dedent } from "@notion-md-converter/testing";
import { QiitaMarkdownUtils } from "./markdown";

describe("note", () => {
  it("note記法になること", () => {
    const result = QiitaMarkdownUtils.note("test");
    expect(result).toBe(dedent`
      :::note info
      test
      :::
    `);
  });

  it("warnのnote記法になること", () => {
    const result = QiitaMarkdownUtils.note("test", "warn");
    expect(result).toBe(dedent`
      :::note warn
      test
      :::
    `);
  });

  it("alertのnote記法になること", () => {
    const result = QiitaMarkdownUtils.note("test", "alert");
    expect(result).toBe(dedent`
      :::note alert
      test
      :::
    `);
  });
});

describe("codeBlock", () => {
  it("codeBlock記法になること", () => {
    const result = QiitaMarkdownUtils.codeBlock("test");
    expect(result).toBe(dedent`
      \`\`\`
      test
      \`\`\`
    `);
  });

  it("diffのcodeBlock記法になること", () => {
    const result = QiitaMarkdownUtils.codeBlock("test", { diff: true, language: "javascript" });
    expect(result).toBe(dedent`
      \`\`\`diff_javascript
      test
      \`\`\`
    `);
  });

  it("filenameのcodeBlock記法になること", () => {
    const result = QiitaMarkdownUtils.codeBlock("test", { filename: "test.js" });
    expect(result).toBe(dedent`
      \`\`\`:test.js
      test
      \`\`\`
    `);
  });
});

describe("equationBlock", () => {
  it("equationBlock記法になること", () => {
    const result = QiitaMarkdownUtils.equationBlock("test");
    expect(result).toBe(dedent`
      \`\`\`math
      test
      \`\`\`
    `);
  });
});

describe("linkCard", () => {
  it("linkCard記法になること", () => {
    const result = QiitaMarkdownUtils.linkCard("https://example.com");
    expect(result).toBe("https://example.com");
  });
});

describe("embedX", () => {
  it("embedX記法になること", () => {
    const result = QiitaMarkdownUtils.embedX("https://x.com");
    expect(result).toBe("https://x.com");
  });
});

describe("embedCodeSandbox", () => {
  it("embedCodeSandbox記法になること", () => {
    const result = QiitaMarkdownUtils.embedCodeSandbox("https://codesandbox.io");
    expect(result).toBe("https://codesandbox.io");
  });
});

describe("embedCodePen", () => {
  it("embedCodePen記法になること", () => {
    const result = QiitaMarkdownUtils.embedCodePen("https://codepen.io/tomoasleep/pen/dJgNLK/");
    expect(result).toBe(dedent`
      <p data-height="250" data-theme-id="0" data-slug-hash="dJgNLK" data-default-tab="result" data-user="tomoasleep" data-embed-version="2" data-pen-title="dJgNLK" class="codepen"></p>
      <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
    `);
  });

  it("heightを指定できること", () => {
    const result = QiitaMarkdownUtils.embedCodePen("https://codepen.io/tomoasleep/pen/dJgNLK/", {
      height: "300",
    });
    expect(result).toBe(dedent`
      <p data-height="300" data-theme-id="0" data-slug-hash="dJgNLK" data-default-tab="result" data-user="tomoasleep" data-embed-version="2" data-pen-title="dJgNLK" class="codepen"></p>
      <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
    `);
  });

  it("defaultTabを指定できること", () => {
    const result = QiitaMarkdownUtils.embedCodePen("https://codepen.io/tomoasleep/pen/dJgNLK/", {
      defaultTab: "js,result",
    });
    expect(result).toBe(dedent`
      <p data-height="250" data-theme-id="0" data-slug-hash="dJgNLK" data-default-tab="js,result" data-user="tomoasleep" data-embed-version="2" data-pen-title="dJgNLK" class="codepen"></p>
      <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
    `);
  });
});

describe("embedGitHubGist", () => {
  it("embedGitHubGist記法になること", () => {
    const result = QiitaMarkdownUtils.embedGitHubGist("https://gist.github.com/user/123456789");
    expect(result).toBe("https://gist.github.com/user/123456789");
  });
});

describe("embedAsciinema", () => {
  it("jsファイルの場合、script要素になること", () => {
    const result = QiitaMarkdownUtils.embedAsciinema("https://asciinema.org/123456789.js");
    expect(result).toBe(
      '<script id="asciicast-123456789" src="https://asciinema.org/123456789.js" async=""></script>',
    );
  });

  it("jsファイル以外の場合、linkCard記法になること", () => {
    const result = QiitaMarkdownUtils.embedAsciinema("https://asciinema.org/123456789");
    expect(result).toBe("https://asciinema.org/123456789");
  });
});

describe("embedFigma", () => {
  it("デフォルトのサイズでiframe要素になること", () => {
    const result = QiitaMarkdownUtils.embedFigma("https://www.figma.com/file/123456789");
    expect(result).toBe(
      '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" height="450" width="800" src="https://www.figma.com/embed?embed_host=astra&url=https://www.figma.com/file/123456789"></iframe>',
    );
  });

  it("サイズを指定できること", () => {
    const result = QiitaMarkdownUtils.embedFigma("https://www.figma.com/file/123456789", {
      height: "600",
      width: "1000",
    });
    expect(result).toBe(
      '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" height="600" width="1000" src="https://www.figma.com/embed?embed_host=astra&url=https://www.figma.com/file/123456789"></iframe>',
    );
  });
});

describe("embedSpeakerDeck", () => {
  it("script要素になること", () => {
    const result = QiitaMarkdownUtils.embedSpeakerDeck("123456789");
    expect(result).toBe(
      '<script async class="speakerdeck-embed" data-id="123456789" data-ratio="1.77777777777778" src="https://speakerdeck.com/assets/embed.js"></script>',
    );
  });
});

describe("embedSlideShare", () => {
  it("デフォルトのサイズでiframe要素になること", () => {
    const result = QiitaMarkdownUtils.embedSlideShare("https://www.slideshare.net/slide/123456789");
    expect(result).toBe(
      '<iframe src="https://www.slideshare.net/slide/123456789" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" loading="lazy" allowfullscreen></iframe>',
    );
  });

  it("サイズを指定できること", () => {
    const result = QiitaMarkdownUtils.embedSlideShare(
      "https://www.slideshare.net/slide/123456789",
      { width: "800", height: "600" },
    );
    expect(result).toBe(
      '<iframe src="https://www.slideshare.net/slide/123456789" width="800" height="600" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" loading="lazy" allowfullscreen></iframe>',
    );
  });
});

describe("embedGoogleSlide", () => {
  it("デフォルトのサイズでiframe要素になること", () => {
    const result = QiitaMarkdownUtils.embedGoogleSlide(
      "https://docs.google.com/presentation/d/123456789",
    );
    expect(result).toBe(
      '<iframe src="https://docs.google.com/presentation/d/123456789" frameborder="0" width="960" height="569" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>',
    );
  });

  it("サイズを指定できること", () => {
    const result = QiitaMarkdownUtils.embedGoogleSlide(
      "https://docs.google.com/presentation/d/123456789",
      { width: "800", height: "600" },
    );
    expect(result).toBe(
      '<iframe src="https://docs.google.com/presentation/d/123456789" frameborder="0" width="800" height="600" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>',
    );
  });
});

describe("embedDocswell", () => {
  it("script要素になること", () => {
    const result = QiitaMarkdownUtils.embedDocswell("https://www.docswell.com/s/123456789");
    expect(result).toBe(
      '<script src="https://www.docswell.com/assets/libs/docswell-embed/docswell-embed.min.js" async class="docswell-embed" data-src="https://www.docswell.com/s/123456789" data-aspect="0.5625"></script>',
    );
  });
});

describe("embedYoutube", () => {
  it("デフォルトのサイズでiframe要素になること", () => {
    const result = QiitaMarkdownUtils.embedYoutube("https://www.youtube.com/embed/123456789");
    expect(result).toBe(
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/123456789" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
    );
  });

  it("サイズを指定できること", () => {
    const result = QiitaMarkdownUtils.embedYoutube("https://www.youtube.com/embed/123456789", {
      width: "800",
      height: "600",
    });
    expect(result).toBe(
      '<iframe width="800" height="600" src="https://www.youtube.com/embed/123456789" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
    );
  });
});
