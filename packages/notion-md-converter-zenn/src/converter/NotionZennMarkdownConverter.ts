import {
  NotionMarkdownConverter,
  createUnsupportedBlockTransformer,
} from "@notion-md-converter/core";
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
  constructor() {
    super({
      transformers: {
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
      },
    });
  }
}
