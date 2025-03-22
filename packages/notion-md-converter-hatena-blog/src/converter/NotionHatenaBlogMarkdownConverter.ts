import {
  NotionMarkdownConverter,
  createMarkdownBookmarkTransformer,
  createMarkdownBulletedListItemTransformer,
  createMarkdownCalloutTransformer,
  createMarkdownCodeTransformer,
  createMarkdownEmbedTransformer,
  createMarkdownFileTransformer,
  createMarkdownHeadingTransformer,
  createMarkdownNumberedListItemTransformer,
  createMarkdownPDFTransformer,
  createMarkdownParagraphTransformer,
  createMarkdownQuoteTransformer,
  createMarkdownTableTransformer,
  createMarkdownToggleTransformer,
} from "@notion-md-converter/core";
import type { TransformerMapping } from "@notion-md-converter/types";
import {
  createHatenaBlogMarkdownTableOfContentsTransformer,
  createHatenaBlogMarkdownTodoListItemTransformer,
} from "../transformer";
import { HatenaBlogMarkdownUtils } from "../utils";

export class NotionHatenaBlogMarkdownConverter extends NotionMarkdownConverter {
  constructor(transformers: TransformerMapping = {}) {
    const enableAnnotations = {
      color: true,
    };
    super({
      bookmark: createMarkdownBookmarkTransformer({
        enableAnnotations,
      }),
      bulleted_list_item: createMarkdownBulletedListItemTransformer({
        enableAnnotations,
      }),
      callout: createMarkdownCalloutTransformer({
        enableAnnotations,
      }),
      code: createMarkdownCodeTransformer({
        languageMapping: HatenaBlogMarkdownUtils.CODE_LANGUAGE_MAPPING,
      }),
      embed: createMarkdownEmbedTransformer({
        enableAnnotations,
        enableEmbed: true,
      }),
      file: createMarkdownFileTransformer({
        enableAnnotations,
      }),
      heading: createMarkdownHeadingTransformer({
        enableAnnotations,
      }),
      numbered_list_item: createMarkdownNumberedListItemTransformer({
        enableAnnotations,
      }),
      paragraph: createMarkdownParagraphTransformer({
        br: true,
        enableAnnotations: {
          color: true,
        },
      }),
      pdf: createMarkdownPDFTransformer({
        outputType: "html-object",
      }),
      quote: createMarkdownQuoteTransformer({
        enableAnnotations,
      }),
      table_of_contents: createHatenaBlogMarkdownTableOfContentsTransformer(),
      table: createMarkdownTableTransformer({
        enableAnnotations,
      }),
      to_do: createHatenaBlogMarkdownTodoListItemTransformer(),
      toggle: createMarkdownToggleTransformer({
        enableAnnotations,
      }),
      ...transformers,
    });
  }

  protected onComplete(markdown: string): string {
    // $が入っていたら数式ありとする
    const hasEquation = markdown.match(/\$/);
    if (hasEquation) {
      const mathjaxScript = [
        "<!-- script for supporting mathematical notation -->",
        "<script>",
        "  MathJax = {",
        "    tex: {",
        "      inlineMath: [ ['$','$'], ['\\(','\\)'] ],",
        "      displayMath: [ ['$$','$$'], ['\\[','\\]'] ],",
        "      processEscapes: true",
        "    }",
        "  }",
        "</script>",
        "<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js'></script>",
      ].join("\n");
      return [mathjaxScript, markdown].join("\n\n");
    }

    return markdown;
  }
}
