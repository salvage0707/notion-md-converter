import type { Block } from "@notion-md-converter/types";
import github from "./github.json" assert { type: "json" };

const linkPreviewFixture = {
  "github": github as Block[],
};

export { linkPreviewFixture };
