import { NotionMarkdownConverter } from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/core/types";
import {
  createZennMarkdownCalloutTransformer,
  createZennMarkdownCodeTransformer,
  createZennMarkdownEmbedTransformer,
  createZennMarkdownFileTransformer,
  createZennMarkdownImageTransformer,
  createZennMarkdownLinkPreviewTransformer,
  createZennMarkdownPDFTransformer,
  createZennMarkdownToggleTransformer,
  createZennMarkdownVideoTransformer,
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
