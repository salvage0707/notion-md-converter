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
