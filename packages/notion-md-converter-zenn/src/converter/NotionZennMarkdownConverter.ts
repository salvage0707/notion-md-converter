import {
  NotionMarkdownConverter,
  createUnsupportedBlockTransformer,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
import {
  createZennMarkdownBookmarkTransformer,
  createZennMarkdownCalloutTransformer,
  createZennMarkdownCodeTransformer,
  createZennMarkdownEmbedTransformer,
  createZennMarkdownImageTransformer,
  createZennMarkdownLinkPreviewTransformer,
  createZennMarkdownToggleTransformer,
} from "../transformer";

export class NotionZennMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      bookmark: createZennMarkdownBookmarkTransformer(),
      code: createZennMarkdownCodeTransformer(),
      callout: createZennMarkdownCalloutTransformer(),
      link_preview: createZennMarkdownLinkPreviewTransformer(),
      embed: createZennMarkdownEmbedTransformer(),
      toggle: createZennMarkdownToggleTransformer(),
      // TODO: サポートしたい
      file: createUnsupportedBlockTransformer(),
      image: createZennMarkdownImageTransformer(),
      // TODO: サポートしたい
      pdf: createUnsupportedBlockTransformer(),
      // TODO: サポートしたい
      video: createUnsupportedBlockTransformer(),
      ...transformers,
    });
  }
}
