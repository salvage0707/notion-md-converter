import { createParagraphBlock, createSyncedBlock, createTextRichText } from "../test-helper";
import { createTransformerContext } from "../test-helper";
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
