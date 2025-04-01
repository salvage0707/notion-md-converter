import {
  createNotionInternalFile,
  createTextRichText,
  createVideoBlock,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownVideoTransformer } from "./createMarkdownVideoTransformer";

describe("VideoTransformer", () => {
  const mockAdapter = vi.fn();
  const transformer = createMarkdownVideoTransformer({
    fileAdapter: mockAdapter,
  });

  beforeEach(() => {
    mockAdapter.mockReturnValue({
      url: "https://example.com/test.mp4",
    });
  });

  it("videoブロックを変換できる", () => {
    const block = createVideoBlock({
      fileObject: createNotionInternalFile({
        url: "https://example.com/test.mp4",
      }),
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(dedent({ wrap: true })`
      <video src="https://example.com/test.mp4" controls></video>
    `);
  });

  it("キャプションがある場合はキャプションを追加できる", () => {
    const block = createVideoBlock({
      fileObject: createNotionInternalFile({
        url: "https://example.com/test.mp4",
      }),
      caption: [
        createTextRichText({
          content: "width=100px&height=200px:",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(dedent({ wrap: true })`
      <video src="https://example.com/test.mp4" controls width="100px" height="200px"></video>
    `);
  });
});
