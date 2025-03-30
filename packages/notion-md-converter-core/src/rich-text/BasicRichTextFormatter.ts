import type {
  ColorMap,
  EnableAnnotations,
  RichText,
  RichTextFormatter,
} from "@notion-md-converter/types";
import { MarkdownUtils, isURL } from "../utils";

/**
 * デフォルトのリッチテキストフォーマッター
 * マークダウン形式でリッチテキストを整形する
 */
export class BasicRichTextFormatter implements RichTextFormatter {
  private colorMap: ColorMap;
  private enableAnnotations: EnableAnnotations;

  constructor(
    options: {
      colorMap?: ColorMap;
      enableAnnotations?: EnableAnnotations;
    } = {},
  ) {
    this.colorMap = options.colorMap || MarkdownUtils.COLOR_MAP;
    this.enableAnnotations = options.enableAnnotations || {
      bold: true,
      italic: true,
      strikethrough: true,
      underline: true,
      code: true,
      equation: true,
      color: false,
      link: true,
    };
  }

  /**
   * リッチテキストをマークダウン形式に整形する
   * @param richTexts リッチテキスト配列
   * @param enableAnnotations 有効化するアノテーション
   * @param colorMap カラーマップ
   * @returns マークダウン形式のテキスト
   */
  format(richTexts: RichText[], enableAnnotations?: EnableAnnotations): string {
    const toMarkdown = (text: RichText, enableAnnotations: EnableAnnotations): string => {
      let markdown = text.plain_text;

      if (text.annotations.code && enableAnnotations.code) {
        markdown = MarkdownUtils.inlineCode(markdown);
      }
      if (text.type === "equation" && enableAnnotations.equation) {
        markdown = MarkdownUtils.inlineEquation(markdown);
      }
      if (text.annotations.bold && enableAnnotations.bold) {
        markdown = MarkdownUtils.bold(markdown);
      }
      if (text.annotations.italic && enableAnnotations.italic) {
        markdown = MarkdownUtils.italic(markdown);
      }
      if (text.annotations.strikethrough && enableAnnotations.strikethrough) {
        markdown = MarkdownUtils.strikethrough(markdown);
      }
      if (text.annotations.underline && enableAnnotations.underline) {
        markdown = MarkdownUtils.underline(markdown);
      }
      if (text.annotations.color && enableAnnotations.color) {
        markdown = MarkdownUtils.color(markdown, text.annotations.color, this.colorMap);
      }
      if (text.href && isURL(text.href) && enableAnnotations.link) {
        markdown = MarkdownUtils.link(markdown, text.href);
      }

      return markdown;
    };

    const options = {
      ...this.enableAnnotations,
      ...enableAnnotations,
    };
    return richTexts
      .map((text) => toMarkdown(text, options))
      .join("")
      .trim();
  }

  plainText(richTexts: RichText[]): string {
    return richTexts.map((text) => text.plain_text).join("");
  }
}
