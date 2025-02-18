import {
  createUnsupportedBlockTransformer,
  NotionMarkdownConverter,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/core/types";
import {
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
      // TODO: サポートしたい
      bookmark: createUnsupportedBlockTransformer(),
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
