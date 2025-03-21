import { createUnsupportedBlockTransformer, NotionMarkdownConverter } from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";

export class NotionHatenaBlogMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      code: createUnsupportedBlockTransformer(),
      equation: createUnsupportedBlockTransformer(),
      to_do: createUnsupportedBlockTransformer(),
      paragraph: createUnsupportedBlockTransformer(),
      table_of_contents: createUnsupportedBlockTransformer(),
      embed: createUnsupportedBlockTransformer(),
      pdf: createUnsupportedBlockTransformer(),
      ...transformers,
    });
  }
}
