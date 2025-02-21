import type { Block } from "@notion-md-converter/types";
import empty from "./empty.json" assert { type: "json" };
import external from "./external.json" assert { type: "json" };
import upload from "./upload.json" assert { type: "json" };

const videoFixture = {
  upload: upload as Block[],
  empty: empty as Block[],
  external: external as Block[],
};

export { videoFixture };
