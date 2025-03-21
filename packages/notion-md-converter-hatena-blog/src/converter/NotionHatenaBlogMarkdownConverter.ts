import { createMarkdownCodeTransformer, createUnsupportedBlockTransformer, NotionMarkdownConverter } from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
import { HatenaBlogMarkdownUtils } from "../utils";

export class NotionHatenaBlogMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      code: createMarkdownCodeTransformer({
        languageMapping: HatenaBlogMarkdownUtils.CODE_LANGUAGE_MAPPING
      }),
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
