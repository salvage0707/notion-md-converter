import type { RichText } from "@notion-md-converter/types";

export type CaptionMetadataType = Record<string, string | undefined>;

export class CaptionMetadata {
  private constructor(
    private readonly metadata: CaptionMetadataType,
    private readonly text: RichText[],
  ) {}

  /**
   * RichTextからCaptionMetadataを生成する
   * example:
   * ex1) メタデータが存在しない場合
   * sample caption
   * => { metadata: {}, text: [sample caption] }
   *
   * ex2) メタデータが存在する場合
   * hoge=fuga:sample caption
   * => { metadata: { hoge: "fuga" }, text: [sample caption] }
   */
  public static fromRichText(richText: RichText[]): CaptionMetadata {
    const captionText = richText.map((rt) => rt.plain_text).join("");
    const captionTexts = captionText.split(":");

    // メタデータが存在しない場合
    if (captionTexts.length === 1) {
      return new CaptionMetadata({}, richText);
    }

    // メタデータの解析
    const metaText = captionTexts[0];
    // hoge=fuga&hoge2=fuga2 => { hoge: "fuga", hoge2: "fuga2" }
    const metadata = metaText.split("&").reduce((acc, meta) => {
      const [key, value] = meta.split("=");
      acc[key] = value || undefined;
      return acc;
    }, {} as CaptionMetadataType);

    // テキスト部分のRichTextを抽出
    const text = captionTexts.slice(1).join(":"); // 複数":"がある場合を考慮
    const textStartIndex = captionText.indexOf(text);

    // テキストが空の場合
    if (text === "") {
      return new CaptionMetadata(metadata, []);
    }

    // メタデータを除いたRichTextの生成
    let currentIndex = 0;
    const textRichTexts = richText.reduce((acc: RichText[], rt) => {
      const plainText = rt.plain_text;
      const textIndex = currentIndex;
      currentIndex += plainText.length;

      if (textIndex >= textStartIndex) {
        acc.push(rt);
      } else if (textIndex + plainText.length > textStartIndex) {
        const startOffset = textStartIndex - textIndex;
        if (rt.type === "text") {
          acc.push({
            ...rt,
            plain_text: plainText.slice(startOffset),
            text: {
              ...rt.text,
              content: rt.text.content.slice(startOffset),
            },
          });
        }
      }
      return acc;
    }, []);

    return new CaptionMetadata(metadata, textRichTexts);
  }

  /**
   * メタデータを取得する
   */
  public getMetadata(): CaptionMetadataType {
    return { ...this.metadata };
  }

  /**
   * テキスト部分のRichTextを取得する
   */
  public getText(): RichText[] {
    return [...this.text];
  }

  /**
   * 特定のメタデータの値を取得する
   */
  public getMetadataValue(key: string): string | undefined {
    return this.metadata[key];
  }

  /**
   * メタデータが存在するかどうかを確認する
   */
  public hasMetadata(key: string): boolean {
    return key in this.metadata;
  }
}
