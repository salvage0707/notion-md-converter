import {
  createUnsupportedBlockTransformer,
  NotionMarkdownConverter,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
import { createQiitaMarkdownBookmarkTransformer } from "../transformer/createQiitaMarkdownBookmarkTransformer";

export class NotionQiitaMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      bookmark: createQiitaMarkdownBookmarkTransformer(),
      breadcrumb: createUnsupportedBlockTransformer(),
      ...transformers,
    });
  }
}
