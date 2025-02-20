import type { Block } from "@notion-md-converter/types";
import empty from "./empty.json" assert { type: "json" };
import external from "./external.json" assert { type: "json" };
import upload from "./upload.json" assert { type: "json" };

const pdfFixture = {
  empty: empty as Block[],
  external: external as Block[],
  upload: upload as Block[],
};

export { pdfFixture };
