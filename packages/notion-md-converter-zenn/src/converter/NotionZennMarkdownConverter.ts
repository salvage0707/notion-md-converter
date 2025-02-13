import { createMarkdownPdfTransformer, NotionMarkdownConverter } from "@notion-md-converter/core";
import {
  createMarkdownFileTransformer,
  createMarkdownImageTransformer,
  createMarkdownToggleTransformer,
  createMarkdownVideoTransformer,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/core/types";
import {
  createZennMarkdownCodeTransformer,
  createZennMarkdownCalloutTransformer,
  createZennMarkdownLinkPreviewTransformer,
} from "../transformer";

export class NotionZennMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      code: createZennMarkdownCodeTransformer(),
      callout: createZennMarkdownCalloutTransformer(),
      link_preview: createZennMarkdownLinkPreviewTransformer(),
      toggle: createMarkdownToggleTransformer(),
      file: createMarkdownFileTransformer(),
      image: createMarkdownImageTransformer(),
      pdf: createMarkdownPdfTransformer(),
      video: createMarkdownVideoTransformer(),
      ...transformers,
    });
  }
}
