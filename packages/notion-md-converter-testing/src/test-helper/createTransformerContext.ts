import type { Block, Context } from "@notion-md-converter/types";
import type { Mock } from "vitest";

export const createTransformerContext = <T extends Block>(options: {
  blocks: T[];
  currentBlockIndex?: number;
}): Context<T> & {
  mockedExecute: Mock;
} => {
  const blocks = options.blocks;
  const currentBlockIndex = options.currentBlockIndex ?? 0;
  const currentBlock = blocks[currentBlockIndex];
  const mockedExecute = vi.fn().mockReturnValue("");

  return {
    execute: mockedExecute,
    mockedExecute,
    blocks,
    currentBlock,
    currentBlockIndex,
  };
};
