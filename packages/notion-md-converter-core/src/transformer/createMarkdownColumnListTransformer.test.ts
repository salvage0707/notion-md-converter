import {
  createColumnBlock,
  createColumnListBlock,
  createParagraphBlock,
  createTextRichText,
  createTransformerContext,
} from "../test-helper";
import { createMarkdownColumnListTransformer } from "./createMarkdownColumnListTransformer";

describe("createMarkdownColumnListTransformer", () => {
  const transformer = createMarkdownColumnListTransformer();

  test("3つのカラムを持つcolumn_listブロックを変換できる", () => {
    const generateParagraph = (text: string) =>
      createParagraphBlock({
        richText: [createTextRichText({ root: { plain_text: text } })],
      });
    const block = createColumnListBlock({
      children: [
        createColumnBlock({
          children: [generateParagraph("左")],
        }),
        createColumnBlock({
          children: [generateParagraph("真ん中")],
        }),
        createColumnBlock({
          children: [generateParagraph("右")],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValueOnce("左");
    context.mockedExecute.mockReturnValueOnce("真ん中");
    context.mockedExecute.mockReturnValueOnce("右");
    const result = transformer(context);

    expect(result).toBe("左\n真ん中\n右");
  });
});
