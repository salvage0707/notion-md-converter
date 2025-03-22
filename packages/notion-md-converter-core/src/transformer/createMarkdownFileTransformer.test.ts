import {
  createFileBlock,
  createNotionInternalFile,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/testing";
import { createMarkdownFileTransformer } from "./createMarkdownFileTransformer";
import { MarkdownUtils } from "../utils";

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

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownFileTransformer({
      fileAdapter: mockAdapter,
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createFileBlock({
        name: "example.pdf",
        caption: [
          createTextRichText({
            content: "caption_example.pdf",
            annotations: {
              color: "red",
            },
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
      const redColor = MarkdownUtils.COLOR_MAP.red as string;
      expect(result).toBe(
        `[<span style="color: ${redColor};">caption_example.pdf</span>](https://example.com/file.pdf)`,
      );
    });
  });
});
