# @notion-md-converter/qiita

## 0.9.0

### Minor Changes

- [#76](https://github.com/salvage0707/notion-md-converter/pull/76) [`0ced8db`](https://github.com/salvage0707/notion-md-converter/commit/0ced8dbf0b8dc1dd56ad3504181cade1a09455f7) Thanks [@salvage0707](https://github.com/salvage0707)! - - CaptionMetada クラスを追加

  - TransformerUtils を削除

- [#74](https://github.com/salvage0707/notion-md-converter/pull/74) [`113347b`](https://github.com/salvage0707/notion-md-converter/commit/113347bf649320a48b580ce1b08d429305950680) Thanks [@salvage0707](https://github.com/salvage0707)! - - MarkdownUtils.richTextsToMarkdown を削除
  - 各 Factory に context を追加し、tools プロパティから共通的な formatter を使う実装に変更
  - BasicRichTextFormatter クラスを追加
    - リッチテキストの変換処理を実行するクラス

### Patch Changes

- Updated dependencies [[`5c68c7b`](https://github.com/salvage0707/notion-md-converter/commit/5c68c7bf2a9062bd800b634116f274587a95d4f2), [`0ced8db`](https://github.com/salvage0707/notion-md-converter/commit/0ced8dbf0b8dc1dd56ad3504181cade1a09455f7), [`113347b`](https://github.com/salvage0707/notion-md-converter/commit/113347bf649320a48b580ce1b08d429305950680), [`9a908e6`](https://github.com/salvage0707/notion-md-converter/commit/9a908e69928125f5efbaaf9347fefbb16f9f3425)]:
  - @notion-md-converter/core@0.9.0

## 0.8.0

### Minor Changes

- [#69](https://github.com/salvage0707/notion-md-converter/pull/69) [`d5ad087`](https://github.com/salvage0707/notion-md-converter/commit/d5ad087e5cc3eb8020c211829dafc2e901c0f4f2) Thanks [@salvage0707](https://github.com/salvage0707)! - HatenaBlog のコンバーターを追加

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

### Patch Changes

- Updated dependencies [[`d5ad087`](https://github.com/salvage0707/notion-md-converter/commit/d5ad087e5cc3eb8020c211829dafc2e901c0f4f2)]:
  - @notion-md-converter/core@0.8.0

## 0.7.4

### Patch Changes

- Updated dependencies [[`1f7e025`](https://github.com/salvage0707/notion-md-converter/commit/1f7e025b5141355786918215590deb904a43ccf5)]:
  - @notion-md-converter/core@0.7.4

## 0.7.3

### Patch Changes

- [#61](https://github.com/salvage0707/notion-md-converter/pull/61) [`3e3b116`](https://github.com/salvage0707/notion-md-converter/commit/3e3b1163f97726c827f828f4af1326e7ba34a6c0) Thanks [@salvage0707](https://github.com/salvage0707)! - factory メソッドの命名を変更し、関数の役割をわかりやすくする

- Updated dependencies [[`3e3b116`](https://github.com/salvage0707/notion-md-converter/commit/3e3b1163f97726c827f828f4af1326e7ba34a6c0)]:
  - @notion-md-converter/core@0.7.3

## 0.7.2

### Patch Changes

- Updated dependencies []:
  - @notion-md-converter/core@0.7.2

## 0.7.1

### Patch Changes

- Updated dependencies [[`8146845`](https://github.com/salvage0707/notion-md-converter/commit/8146845969b94a0d31c954ba612f4fe24a0c77b2)]:
  - @notion-md-converter/core@0.7.1

## 0.7.0

### Patch Changes

- Updated dependencies [[`626a6b6`](https://github.com/salvage0707/notion-md-converter/commit/626a6b6cacbeb6ee72076ae7a596a760de33b26b)]:
  - @notion-md-converter/core@0.7.0

## 0.6.3

### Patch Changes

- Updated dependencies [8d58039]
  - @notion-md-converter/core@0.6.3
