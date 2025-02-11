import type { Mock } from "vitest";
import type { Block, Context } from "../types";

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
