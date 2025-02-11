import {
  createFileBlock,
  createNotionInternalFile,
  createTextRichText,
  createTransformerContext,
} from "../test-helper";
import { createMarkdownFileTransformer } from "./createMarkdownFileTransformer";

describe("createMarkdownFileTransformer", () => {
  const mockAdaptor = {
    execute: vi.fn(),
  };
  const transformer = createMarkdownFileTransformer({
    fileAdapter: mockAdaptor,
  });

  beforeEach(() => {
    mockAdaptor.execute.mockReturnValue({
      url: "https://example.com/file.pdf",
    });
  });

  it("captionがある場合、captionを含めて変換できる", () => {
    const block = createFileBlock({
      name: "example.pdf",
      caption: [
        createTextRichText({
          plainText: "caption_example.pdf",
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
