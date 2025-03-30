import {
  NotionMarkdownConverter,
  createUnsupportedBlockTransformer,
} from "@notion-md-converter/core";
import {
  createQiitaMarkdownBookmarkTransformer,
  createQiitaMarkdownCalloutTransformer,
  createQiitaMarkdownCodeTransformer,
  createQiitaMarkdownEmbedTransformer,
  createQiitaMarkdownEquationTransformer,
  createQiitaMarkdownLinkPreviewTransformer,
  createQiitaMarkdownVideoTransformer,
} from "../transformer";

export class NotionQiitaMarkdownConverter extends NotionMarkdownConverter {
  constructor() {
    super({
      transformers: {
        bookmark: createQiitaMarkdownBookmarkTransformer(),
        breadcrumb: createUnsupportedBlockTransformer(),
        callout: createQiitaMarkdownCalloutTransformer(),
        code: createQiitaMarkdownCodeTransformer(),
        equation: createQiitaMarkdownEquationTransformer(),
        link_preview: createQiitaMarkdownLinkPreviewTransformer(),
        video: createQiitaMarkdownVideoTransformer(),
        embed: createQiitaMarkdownEmbedTransformer(),
        pdf: createUnsupportedBlockTransformer(),
        file: createUnsupportedBlockTransformer(),
      },
    });
  }
}
