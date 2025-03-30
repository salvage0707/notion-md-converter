import {
  BasicRichTextFormatter,
  NotionMarkdownConverter,
  createMarkdownBookmarkTransformer,
  createMarkdownBulletedListItemTransformer,
  createMarkdownCodeTransformer,
  createMarkdownEmbedTransformer,
  createMarkdownFileTransformer,
  createMarkdownHeadingTransformer,
  createMarkdownNumberedListItemTransformer,
  createMarkdownPDFTransformer,
  createMarkdownParagraphTransformer,
  createMarkdownTableTransformer,
  createMarkdownToggleTransformer,
} from "@notion-md-converter/core";
import {
  createHatenaBlogMarkdownCalloutTransformer,
  createHatenaBlogMarkdownQuoteTransformer,
  createHatenaBlogMarkdownTableOfContentsTransformer,
  createHatenaBlogMarkdownTodoListItemTransformer,
} from "../transformer";
import { HatenaBlogMarkdownUtils } from "../utils";

export class NotionHatenaBlogMarkdownConverter extends NotionMarkdownConverter {
  constructor() {
    super({
      transformers: {
      bookmark: createMarkdownBookmarkTransformer(),
      bulleted_list_item: createMarkdownBulletedListItemTransformer(),
      callout: createHatenaBlogMarkdownCalloutTransformer(),
      code: createMarkdownCodeTransformer({
        languageMapping: HatenaBlogMarkdownUtils.CODE_LANGUAGE_MAPPING,
      }),
      embed: createMarkdownEmbedTransformer({
        enableEmbed: true,
      }),
      file: createMarkdownFileTransformer(),
      heading: createMarkdownHeadingTransformer(),
      numbered_list_item: createMarkdownNumberedListItemTransformer(),
      paragraph: createMarkdownParagraphTransformer({
        br: true,
      }),
      pdf: createMarkdownPDFTransformer({
        outputType: "html-object",
      }),
      quote: createHatenaBlogMarkdownQuoteTransformer(),
      table_of_contents: createHatenaBlogMarkdownTableOfContentsTransformer(),
      table: createMarkdownTableTransformer(),
      to_do: createHatenaBlogMarkdownTodoListItemTransformer(),
      toggle: createMarkdownToggleTransformer(),
    },
      tools: {
        richTextFormatter: new BasicRichTextFormatter({
          enableAnnotations: {
            bold: true,
            italic: true,
            underline: true,
            strikethrough: true,
            code: true,
            color: true,
            link: true,
            equation: true,
          }
        })
      }
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
        "      inlineMath: [ ['$','$'] ],",
        "      displayMath: [ ['$$','$$'] ],",
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
