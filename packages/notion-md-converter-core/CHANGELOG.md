# @notion-md-converter/core

## 0.12.0

### Minor Changes

- [#89](https://github.com/salvage0707/notion-md-converter/pull/89) [`44aec87`](https://github.com/salvage0707/notion-md-converter/commit/44aec8744277a41a1e208f1b84a131f0d72def8b) Thanks [@salvage0707](https://github.com/salvage0707)! - feat: add CLI and MCP server packages with core improvements

  - **CLI Package**: Add new `@notion-md-converter/cli` package
    providing command-line interface for converting Notion pages to
    Markdown
  - **MCP Server**: Add new `@notion-md-converter/mcp` package
    implementing Model Context Protocol server for Notion
    integration
  - **Core Enhancements**: Optimize `$getPageFullContent`
    function with retry logic and parallel processing, add
    comprehensive tests
  - **Documentation**: Add CLI implementation plan and
    comprehensive usage examples

  This release introduces two major new packages expanding the
  ecosystem with command-line and protocol server capabilities.

## 0.11.0

### Minor Changes

- [#87](https://github.com/salvage0707/notion-md-converter/pull/87) [`073b6b6`](https://github.com/salvage0707/notion-md-converter/commit/073b6b68ca2464a16639d225da75272669835dfa) Thanks [@salvage0707](https://github.com/salvage0707)! - feat: add CLI package for converting Notion pages to Markdown

  - Add new `@notion-md-converter/cli` package with command-line interface
  - Support converting Notion pages to Markdown via `notion-md-cli convert` command
  - Accept both Notion page IDs and URLs as input
  - Remove deprecated warning from `$getPageFullContent` function in core package
  - Add comprehensive CLI documentation and examples

  この変更は新しいパッケージの追加なので major バージョンアップ、コアパッケージの軽微な変更は patch が適切です。

## 0.10.0

### Minor Changes

- [#85](https://github.com/salvage0707/notion-md-converter/pull/85) [`98b39d1`](https://github.com/salvage0707/notion-md-converter/commit/98b39d1534871f60413b16330fdb30e68f418eb7) Thanks [@salvage0707](https://github.com/salvage0707)! - feat: upgrade to Node.js v24 requirement

  BREAKING CHANGE: This package now requires Node.js v24.0.0 or higher. Previous Node.js versions are no longer supported.

  - Updated all package.json files to specify `engines: { "node": ">=24.0.0" }`
  - Fixed rollup configuration compatibility issues with Node.js v24
  - Updated CI/CD pipelines to use Node.js v24
  - All builds and tests are now validated against Node.js v24

  If you are using an older version of Node.js, please upgrade to Node.js v24 or higher before updating to this version.

## 0.9.0

### Minor Changes

- [#76](https://github.com/salvage0707/notion-md-converter/pull/76) [`0ced8db`](https://github.com/salvage0707/notion-md-converter/commit/0ced8dbf0b8dc1dd56ad3504181cade1a09455f7) Thanks [@salvage0707](https://github.com/salvage0707)! - - CaptionMetada クラスを追加

  - TransformerUtils を削除

- [#74](https://github.com/salvage0707/notion-md-converter/pull/74) [`113347b`](https://github.com/salvage0707/notion-md-converter/commit/113347bf649320a48b580ce1b08d429305950680) Thanks [@salvage0707](https://github.com/salvage0707)! - - MarkdownUtils.richTextsToMarkdown を削除
  - 各 Factory に context を追加し、tools プロパティから共通的な formatter を使う実装に変更
  - BasicRichTextFormatter クラスを追加
    - リッチテキストの変換処理を実行するクラス

### Patch Changes

- [#78](https://github.com/salvage0707/notion-md-converter/pull/78) [`5c68c7b`](https://github.com/salvage0707/notion-md-converter/commit/5c68c7bf2a9062bd800b634116f274587a95d4f2) Thanks [@salvage0707](https://github.com/salvage0707)! - video タグの実装場所変更

- [#77](https://github.com/salvage0707/notion-md-converter/pull/77) [`9a908e6`](https://github.com/salvage0707/notion-md-converter/commit/9a908e69928125f5efbaaf9347fefbb16f9f3425) Thanks [@salvage0707](https://github.com/salvage0707)! - サポートなしの場合の空行の出力で改行されないようにする

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

## 0.7.4

### Patch Changes

- [#66](https://github.com/salvage0707/notion-md-converter/pull/66) [`1f7e025`](https://github.com/salvage0707/notion-md-converter/commit/1f7e025b5141355786918215590deb904a43ccf5) Thanks [@salvage0707](https://github.com/salvage0707)! - 前後に空白があある場合に RichText のデコレーションが正しく動作しない不具合を修正

## 0.7.3

### Patch Changes

- [#61](https://github.com/salvage0707/notion-md-converter/pull/61) [`3e3b116`](https://github.com/salvage0707/notion-md-converter/commit/3e3b1163f97726c827f828f4af1326e7ba34a6c0) Thanks [@salvage0707](https://github.com/salvage0707)! - factory メソッドの命名を変更し、関数の役割をわかりやすくする

## 0.7.2

## 0.7.1

### Patch Changes

- [#52](https://github.com/salvage0707/notion-md-converter/pull/52) [`8146845`](https://github.com/salvage0707/notion-md-converter/commit/8146845969b94a0d31c954ba612f4fe24a0c77b2) Thanks [@salvage0707](https://github.com/salvage0707)! - empty release

## 0.7.0

### Minor Changes

- [#47](https://github.com/salvage0707/notion-md-converter/pull/47) [`626a6b6`](https://github.com/salvage0707/notion-md-converter/commit/626a6b6cacbeb6ee72076ae7a596a760de33b26b) Thanks [@salvage0707](https://github.com/salvage0707)! - update: リッチテキストで link に対応

## 0.6.3

### Patch Changes

- 8d58039: refactor transformer test
