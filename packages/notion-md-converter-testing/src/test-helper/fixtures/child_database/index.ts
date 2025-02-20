import type { Block } from "@notion-md-converter/types";
import fullPage from "./full-page.json" assert { type: "json" };
import inline from "./inline.json" assert { type: "json" };

const childDatabaseFixture = {
  inline: inline as Block[],
  "full-page": fullPage as Block[],
};

export { childDatabaseFixture };
