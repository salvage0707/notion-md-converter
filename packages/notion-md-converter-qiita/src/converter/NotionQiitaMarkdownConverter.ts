import {
  createMarkdownColumnListTransformer,
  createMarkdownDividerTransformer,
  createUnsupportedBlockTransformer,
  NotionMarkdownConverter,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
import { createQiitaMarkdownBookmarkTransformer, createQiitaMarkdownCalloutTransformer, createQiitaMarkdownCodeTransformer, createQiitaMarkdownEquationTransformer } from "../transformer";

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
      ...transformers,
    });
  }
}
