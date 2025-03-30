import type { Block, Context, RichText } from "@notion-md-converter/types";
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
  const tools = {
    richTextFormatter: {
      format: vi
        .fn()
        .mockImplementation((richTexts, _options, _colorMap) =>
          richTexts.map((richText: RichText) => richText.plain_text).join(""),
        ),
    },
  };

  return {
    execute: mockedExecute,
    mockedExecute,
    blocks,
    currentBlock,
    currentBlockIndex,
    tools,
  };
};
