import { createMarkdownPdfTransformer, NotionMarkdownConverter } from "@notion-md-converter/core";
import {
  createMarkdownFileTransformer,
  createMarkdownImageTransformer,
  createMarkdownLinkPreviewTransformer,
  createMarkdownToggleTransformer,
  createMarkdownVideoTransformer,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/core/types";
import {
  createZennMarkdownCodeTransformer,
  createZennMarkdownCalloutTransformer,
} from "../transformer";

export class NotionZennMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      code: createZennMarkdownCodeTransformer(),
      callout: createZennMarkdownCalloutTransformer(),
      link_preview: createMarkdownLinkPreviewTransformer(),
      toggle: createMarkdownToggleTransformer(),
      file: createMarkdownFileTransformer(),
      image: createMarkdownImageTransformer(),
      pdf: createMarkdownPdfTransformer(),
      video: createMarkdownVideoTransformer(),
      ...transformers,
    });
  }
}
