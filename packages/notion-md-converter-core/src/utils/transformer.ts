import type { RichText } from "../types";
import type { EnableAnnotations } from "./markdown";
import { MarkdownUtils } from "./markdown";

/**
 * キャプションからメタデータを抽出する
 *
 * example:
 *
 * caption: id=1234567890:some text
 * metadata: { id: "1234567890" }
 * text: "some text"
 *
 * caption: id=1234567890&width=100:some text
 * metadata: { id: "1234567890", width: "100" }
 * text: "some text"
 *
 * caption: id=1234567890:
 * metadata: { id: "1234567890" }
 * text: ""
 *
 * caption: some text
 * metadata: {}
 * text: "some text"
 *
 * @param caption キャプション
 * @returns メタデータとテキスト
 */
const getCaptionMetadata = (
  caption: RichText[],
): { metadata: Record<string, string | undefined>; text: string } => {
  const captionText = caption.map((richText) => richText.plain_text).join("");
  const captionTexts = captionText.split(":");

  if (captionTexts.length === 1) {
    return { metadata: {}, text: captionText };
  }

  const metaText = captionTexts[0];
  const metadata = metaText.split("&").reduce(
    (acc, meta) => {
      const [key, value] = meta.split("=");
      acc[key] = value || undefined;
      return acc;
    },
    {} as Record<string, string | undefined>,
  );
  const text = captionTexts.slice(1).join(":");
  return { metadata, text };
};

/**
 * キャプションからテキストを抽出する
 *
 * @param caption キャプション
 * @param annotations アノテーション
 * @returns テキスト
 */
const getCaptionText = (caption: RichText[], annotations?: EnableAnnotations): string => {
  const captionText = caption.map((richText) => richText.plain_text).join("");
  const captionTexts = captionText.split(":");

  if (captionTexts.length === 1) {
    return MarkdownUtils.richTextsToMarkdown(caption, annotations).trim();
  }

  // メタデータを除去したRichTextを作成
  const text = captionTexts.slice(1).join(":");
  const textStartIndex = captionText.indexOf(text);

  // テキストが空の場合は空文字を返す
  if (text === "") {
    return "";
  }

  // メタデータ部分を除いたRichTextを作成
  let currentIndex = 0;
  const textRichTexts = caption.reduce((acc: RichText[], richText) => {
    const plainText = richText.plain_text;
    const textIndex = currentIndex;
    currentIndex += plainText.length;

    // テキスト部分が開始位置以降にある場合は追加
    if (textIndex >= textStartIndex) {
      acc.push(richText);
    }
    // テキスト部分が開始位置をまたぐ場合は、該当部分のみを抽出
    else if (textIndex + plainText.length > textStartIndex) {
      const startOffset = textStartIndex - textIndex;
      if (richText.type === "text") {
        acc.push({
          ...richText,
          plain_text: plainText.slice(startOffset),
          text: {
            ...richText.text,
            content: richText.text.content.slice(startOffset),
          },
        });
      }
    }
    return acc;
  }, []);

  return MarkdownUtils.richTextsToMarkdown(textRichTexts, annotations).trim();
};

export const TransformerUtils = {
  getCaptionMetadata,
  getCaptionText,
};
