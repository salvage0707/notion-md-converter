import { createNotionInternalFile, createVideoBlock } from "@notion-md-converter/core/test-helper";
import { createTransformerContext } from "@notion-md-converter/core/test-helper";
import { createMarkdownVideoTransformer } from "./createMarkdownVideoTransformer";

describe("VideoTransformer", () => {
  const mockAdaptor = {
    execute: vi.fn(),
  };
  const transformer = createMarkdownVideoTransformer({
    fileAdaptor: mockAdaptor,
  });

  beforeEach(() => {
    mockAdaptor.execute.mockReturnValue({
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
