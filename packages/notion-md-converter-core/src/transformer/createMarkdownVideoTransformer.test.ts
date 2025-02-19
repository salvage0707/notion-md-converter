import { createNotionInternalFile, createVideoBlock } from "../test-helper";
import { createTransformerContext } from "../test-helper";
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
    expect(result).toBe(`\n<video controls src="https://example.com/test.mp4"></video>\n`);
  });
});
