import { NotionMarkdownConverter } from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/core/types";
import {
  createZennMarkdownCodeTransformer,
  createZennMarkdownCalloutTransformer,
  createZennMarkdownLinkPreviewTransformer,
  createZennMarkdownToggleTransformer,
  createZennMarkdownFileTransformer,
  createZennMarkdownImageTransformer,
  createZennMarkdownPDFTransformer,
  createZennMarkdownVideoTransformer,
  createZennMarkdownEmbedTransformer,
} from "../transformer";

export class NotionZennMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      code: createZennMarkdownCodeTransformer(),
      callout: createZennMarkdownCalloutTransformer(),
      link_preview: createZennMarkdownLinkPreviewTransformer(),
      embed: createZennMarkdownEmbedTransformer(),
      toggle: createZennMarkdownToggleTransformer(),
      file: createZennMarkdownFileTransformer(),
      image: createZennMarkdownImageTransformer(),
      pdf: createZennMarkdownPDFTransformer(),
      video: createZennMarkdownVideoTransformer(),
      ...transformers,
    });
  }
}
