import {
  NotionMarkdownConverter,
  createMarkdownColumnListTransformer,
  createMarkdownDividerTransformer,
  createMarkdownHeadingTransformer,
  createUnsupportedBlockTransformer,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
import {
  createQiitaMarkdownBookmarkTransformer,
  createQiitaMarkdownCalloutTransformer,
  createQiitaMarkdownCodeTransformer,
  createQiitaMarkdownEquationTransformer,
  createQiitaMarkdownLinkPreviewTransformer,
} from "../transformer";

export class NotionQiitaMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      bookmark: createQiitaMarkdownBookmarkTransformer(),
      breadcrumb: createUnsupportedBlockTransformer(),
      callout: createQiitaMarkdownCalloutTransformer(),
      code: createQiitaMarkdownCodeTransformer(),
      column_list: createMarkdownColumnListTransformer(),
      divider: createMarkdownDividerTransformer(),
      equation: createQiitaMarkdownEquationTransformer(),
      heading: createMarkdownHeadingTransformer(),
      link_preview: createQiitaMarkdownLinkPreviewTransformer(),
      ...transformers,
    });
  }
}
