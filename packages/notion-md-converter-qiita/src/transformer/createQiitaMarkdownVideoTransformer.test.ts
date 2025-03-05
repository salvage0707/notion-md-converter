import {
  createNotionExternalFile,
  createNotionInternalFile,
  createVideoBlock,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createQiitaMarkdownVideoTransformer } from "./createQiitaMarkdownVideoTransformer";

describe("createQiitaMarkdownVideoTransformer", () => {
  const mockAdapter = vi.fn();
  const transformer = createQiitaMarkdownVideoTransformer({
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
      <video controls src="https://example.com/test.mp4"></video>
    `);
  });

  it("埋め込み可能なURLの場合は埋め込み形式で出力できる", () => {
    const block = createVideoBlock({
      fileObject: createNotionExternalFile({
        url: "https://www.youtube.com/watch?v=example",
      }),
    });
    mockAdapter.mockReturnValue({
      url: "https://www.youtube.com/watch?v=example",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(
      '<iframe width="560" height="315" src="https://www.youtube.com/watch?v=example" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
    );
  });
});
