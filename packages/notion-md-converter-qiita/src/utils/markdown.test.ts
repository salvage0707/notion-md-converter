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
