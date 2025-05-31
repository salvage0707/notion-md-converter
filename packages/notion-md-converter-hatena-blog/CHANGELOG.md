# @notion-md-converter/hatena-blog

## 0.10.0

### Minor Changes

- [#85](https://github.com/salvage0707/notion-md-converter/pull/85) [`98b39d1`](https://github.com/salvage0707/notion-md-converter/commit/98b39d1534871f60413b16330fdb30e68f418eb7) Thanks [@salvage0707](https://github.com/salvage0707)! - feat: upgrade to Node.js v24 requirement

  BREAKING CHANGE: This package now requires Node.js v24.0.0 or higher. Previous Node.js versions are no longer supported.

  - Updated all package.json files to specify `engines: { "node": ">=24.0.0" }`
  - Fixed rollup configuration compatibility issues with Node.js v24
  - Updated CI/CD pipelines to use Node.js v24
  - All builds and tests are now validated against Node.js v24

  If you are using an older version of Node.js, please upgrade to Node.js v24 or higher before updating to this version.

### Patch Changes

- Updated dependencies [[`98b39d1`](https://github.com/salvage0707/notion-md-converter/commit/98b39d1534871f60413b16330fdb30e68f418eb7)]:
  - @notion-md-converter/core@0.10.0

## 0.9.0

### Minor Changes

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
