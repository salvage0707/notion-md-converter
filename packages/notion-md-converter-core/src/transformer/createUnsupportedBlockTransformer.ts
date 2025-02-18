import type { UnsupportedBlockTransformer } from "../types";

export const createUnsupportedBlockTransformer = (
  { log } = {
    log: false,
  },
): UnsupportedBlockTransformer => {
  return (context) => {
    if (log) {
      console.log("Unsupported block", context.currentBlock);
    }
    return "";
  };
};
