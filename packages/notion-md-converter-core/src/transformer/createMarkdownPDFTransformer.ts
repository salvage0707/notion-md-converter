import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { HTMLUtils, MarkdownUtils, TransformerUtils } from "../utils";
import { createPDFTransformerFactory } from "./transformerFactory";

type PDFTransformerOptions = {
  fileAdapter?: FileAdapter;
  outputType?: "markdown-link" | "html-object";
}

export const createMarkdownPDFTransformer = (options: PDFTransformerOptions = {}) => {
  const { outputType = "markdown-link" } = options;

  return createPDFTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.pdf);

    if (outputType === "markdown-link") {
      const caption =
        block.pdf.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.pdf.caption) : url;
      return `[${caption}](${url})`;
    }

    if (outputType === "html-object") {
      const { metadata } = TransformerUtils.getCaptionMetadata(block.pdf.caption);
      const properties = {
        ...metadata,
        width: metadata.width,
        height: metadata.height,
      };
      return HTMLUtils.objectTag({ data: url, type: "application/pdf", ...properties });
    }

    throw new Error(`Invalid output type: ${outputType}`);
  });
};
