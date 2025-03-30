import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { HTMLUtils } from "../utils";
import { createPDFTransformerFactory } from "./transformerFactory";

type PDFTransformerOptions =
  | {
      fileAdapter?: FileAdapter;
      outputType?: "markdown-link";
    }
  | {
      fileAdapter?: FileAdapter;
      outputType?: "html-object";
    };

export const createMarkdownPDFTransformer = (
  options: PDFTransformerOptions = {
    outputType: "markdown-link",
  },
) => {
  return createPDFTransformerFactory(({ block, captionMetadata, context }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.pdf);

    if (options.outputType === "markdown-link") {
      const caption =
        block.pdf.caption.length > 0
          ? context.tools.richTextFormatter.format(block.pdf.caption)
          : url;
      return `[${caption}](${url})`;
    }

    if (options.outputType === "html-object") {
      return HTMLUtils.objectTag({
        data: url,
        type: "application/pdf",
        ...captionMetadata.getMetadata(),
      });
    }

    throw new Error(`Invalid output type: ${options.outputType}`);
  });
};
