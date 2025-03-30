import type { RichText } from "@notion-md-converter/types";
import type { CaptionMetadataType } from "../rich-text/CaptionMetadata";
import { CaptionMetadata } from "../rich-text/CaptionMetadata";

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
export const TransformerUtils = {
  /**
   * @deprecated Use CaptionMetadata.fromRichText() instead
   */
  getCaptionMetadata(caption: RichText[]): { metadata: CaptionMetadataType; text: string } {
    const captionMetadata = CaptionMetadata.fromRichText(caption);
    return {
      metadata: captionMetadata.getMetadata(),
      text: captionMetadata.getText().map(rt => rt.plain_text).join("")
    };
  },

  /**
   * @deprecated Use CaptionMetadata.fromRichText() instead
   */
  getExtractedMetadataRichText(caption: RichText[]): RichText[] {
    return CaptionMetadata.fromRichText(caption).getText();
  },
};
