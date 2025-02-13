import { createMarkdownPdfTransformer, NotionMarkdownConverter } from "@notion-md-converter/core";
import {
  createMarkdownImageTransformer,
  createMarkdownVideoTransformer,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/core/types";
import {
  createZennMarkdownCodeTransformer,
  createZennMarkdownCalloutTransformer,
  createZennMarkdownLinkPreviewTransformer,
  createZennMarkdownToggleTransformer,
  createZennMarkdownFileTransformer,
} from "../transformer";

export class NotionZennMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      code: createZennMarkdownCodeTransformer(),
      callout: createZennMarkdownCalloutTransformer(),
      link_preview: createZennMarkdownLinkPreviewTransformer(),
      toggle: createZennMarkdownToggleTransformer(),
      file: createZennMarkdownFileTransformer(),
      image: createMarkdownImageTransformer(),
      pdf: createMarkdownPdfTransformer(),
      video: createMarkdownVideoTransformer(),
      ...transformers,
    });
  }
}
