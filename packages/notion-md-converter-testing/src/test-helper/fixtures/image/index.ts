import type { Block } from "@notion-md-converter/types";
import empty from "./empty.json" assert { type: "json" };
import external from "./external.json" assert { type: "json" };
import gihpy from "./gihpy.json" assert { type: "json" };
import upload from "./upload.json" assert { type: "json" };
import upsplash from "./upsplash.json" assert { type: "json" };

const imageFixture = {
  external: external as Block[],
  gihpy: gihpy as Block[],
  upload: upload as Block[],
  upsplash: upsplash as Block[],
  empty: empty as Block[],
};

export { imageFixture };
