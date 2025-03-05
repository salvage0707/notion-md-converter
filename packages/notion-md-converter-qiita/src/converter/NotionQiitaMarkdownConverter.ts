import {
  NotionMarkdownConverter,
  createUnsupportedBlockTransformer,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
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
  constructor(transformers: TransformerMapping = {}) {
    super({
      bookmark: createQiitaMarkdownBookmarkTransformer(),
      breadcrumb: createUnsupportedBlockTransformer(),
      callout: createQiitaMarkdownCalloutTransformer(),
      code: createQiitaMarkdownCodeTransformer(),
      equation: createQiitaMarkdownEquationTransformer(),
      link_preview: createQiitaMarkdownLinkPreviewTransformer(),
      video: createQiitaMarkdownVideoTransformer(),
      embed: createQiitaMarkdownEmbedTransformer(),
      ...transformers,
    });
  }
}
