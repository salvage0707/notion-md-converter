import { NotionMarkdownConverter } from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";

export class NotionHatenaBlogMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      ...transformers,
    });
  }
}
