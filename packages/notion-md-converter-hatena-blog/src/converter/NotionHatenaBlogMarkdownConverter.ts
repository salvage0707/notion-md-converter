import { createMarkdownCodeTransformer, createMarkdownParagraphTransformer, createUnsupportedBlockTransformer, NotionMarkdownConverter } from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
import { HatenaBlogMarkdownUtils } from "../utils";
import { createHatenaBlogMarkdownTableOfContentsTransformer, createHatenaBlogMarkdownTodoListItemTransformer } from "../transformer";

export class NotionHatenaBlogMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    super({
      code: createMarkdownCodeTransformer({
        languageMapping: HatenaBlogMarkdownUtils.CODE_LANGUAGE_MAPPING,
      }),
      to_do: createHatenaBlogMarkdownTodoListItemTransformer(),
      paragraph: createMarkdownParagraphTransformer({ br: true }),
      table_of_contents: createHatenaBlogMarkdownTableOfContentsTransformer(),
      embed: createUnsupportedBlockTransformer(),
      pdf: createUnsupportedBlockTransformer(),
      ...transformers,
    });
  }

  protected onComplete(markdown: string): string {
    // $が入っていたら数式ありとする
    const hasEquation = markdown.match(/\$/);
    if (hasEquation) {
      const mathjaxScript = [
        "<!-- script for supporting mathematical notation -->",
        "<script type='text/x-mathjax-config'>",
        "  MathJax.Hub.Config({",
        "    tex2jax: {",
        "      inlineMath: [ ['$','$'], ['\\(','\\)'] ],",
        "      displayMath: [ ['$$','$$'], ['\\[','\\]'] ],",
        "      processEscapes: true",
        "    }",
        "  }",
        "</script>",
        "<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'></script>",
      ].join("\n");
      return [mathjaxScript, markdown].join("\n\n");
    }

    return markdown;
  }
}
