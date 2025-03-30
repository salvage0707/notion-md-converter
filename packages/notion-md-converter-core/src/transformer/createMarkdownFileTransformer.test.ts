import {
  createFileBlock,
  createNotionInternalFile,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/testing";
import { createMarkdownFileTransformer } from "./createMarkdownFileTransformer";

describe("createMarkdownFileTransformer", () => {
  const mockAdapter = vi.fn();
  const transformer = createMarkdownFileTransformer({
    fileAdapter: mockAdapter,
  });

  beforeEach(() => {
    mockAdapter.mockReturnValue({
      url: "https://example.com/file.pdf",
    });
  });

  it("captionがある場合、captionを含めて変換できる", () => {
    const block = createFileBlock({
      name: "example.pdf",
      caption: [
        createTextRichText({
          content: "caption_example.pdf",
        }),
      ],
      fileObject: createNotionInternalFile({
        url: "https://example.com/file.pdf",
      }),
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("[caption_example.pdf](https://example.com/file.pdf)");
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.file.caption);
  });

  it("captionがない場合、ファイル名のみを含めて変換できる", () => {
    const block = createFileBlock({
      name: "example.pdf",
      caption: [],
      fileObject: createNotionInternalFile({
        url: "https://example.com/file.pdf",
      }),
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("[example.pdf](https://example.com/file.pdf)");
  });
});
