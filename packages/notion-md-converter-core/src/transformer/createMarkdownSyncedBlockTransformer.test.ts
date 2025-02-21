import {
  createParagraphBlock,
  createSyncedBlock,
  createTextRichText,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownSyncedBlockTransformer } from "./createMarkdownSyncedBlockTransformer";

describe("createMarkdownSyncedBlockTransformer", () => {
  const transformer = createMarkdownSyncedBlockTransformer();

  it("子要素を変換する", () => {
    const block = createSyncedBlock({
      children: [
        createParagraphBlock({
          richText: [
            createTextRichText({
              plainText: "シンプルなテキストです。",
            }),
          ],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("シンプルなテキストです。");
    const result = transformer(context);

    expect(result).toBe("シンプルなテキストです。");
  });
});
