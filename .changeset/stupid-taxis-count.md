---
"@notion-md-converter/hatena-blog": minor
"@notion-md-converter/qiita": minor
"@notion-md-converter/core": minor
"@notion-md-converter/zenn": minor
---

HatenaBlog のコンバーターを追加

- NotionMarkdownConverter#onComplete
  - 変換後の Markdown 文字列に対して処理をできる関数を追加
- 各 BaseTransformer に RichText のデコレーション対応オプションを追加
  - createMarkdownBookmarkTransformer
  - createMarkdownBulletedListItemTransformer
  - createMarkdownCalloutTransformer
  - createMarkdownEmbedTransformer
  - createMarkdownFileTransformer
  - createMarkdownHeadingTransformer
  - createMarkdownNumberedListItemTransformer
  - createMarkdownPDFTransformer
  - createMarkdownParagraphTransformer
  - createMarkdownQuoteTransformer
  - createMarkdownTableTransformer
  - createMarkdownTodoListItemTransformer
  - createMarkdownToggleTransformer
- createMarkdownCodeTransformer に言語マッピングの設定を追加
- createMarkdownEmbedTransformer に埋め込み HTML での出力ができる機能を追加
  - 対応 Provider は youtube, codepen, asciinema
  - supportedEmbedProviders を使用することで個別で対応設定可能
- createMarkdownPDFTransformer に object タグでの出力ができる機能を追加
- createMarkdownParagraphTransformer の末尾に改行タグを入れられる機能を追加
- HTML 関連の utils を追加
  - objectToPropertiesStr（QiitaMarkdownUtils から移植）
  - objectTag
- markdown の utils の設定を変更
  - COLOR_MAP の色の設定値を変更
  - color で背景色と文字色を分けて設定可能にする
  - richTextsToMarkdown のカラー設定を変更できるようにする
- provider の utils を追加
  - getType（markdown.ts から移植）
  - getYoutubeVideoIdFromEmbedUrl（QiitaMarkdownUtils から移植）
  - embedYoutube（QiitaMarkdownUtils から移植）
  - embedCodePen（QiitaMarkdownUtils から移植）
  - embedAsciinema（QiitaMarkdownUtils から移植）
  - embedByUrl
- transformer.ts の設定変更
  - getCaptionText のオプションの取り方を変更
