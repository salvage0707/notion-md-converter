# @notion-md-converter/types

## 0.12.1

### Patch Changes

- [#92](https://github.com/salvage0707/notion-md-converter/pull/92) [`b36dd62`](https://github.com/salvage0707/notion-md-converter/commit/b36dd629626548643e484384266550e748d332bf) Thanks [@salvage0707](https://github.com/salvage0707)! - ドキュメントを日本語に翻訳

  - すべての README ファイルを日本語に翻訳しました
  - 技術用語とテーブルヘッダーは英語のまま維持
  - note.com の対応予定を削除（今後対応しないため）
  - はてなブログの対応ステータスを「対応済み」に更新
  - CLAUDE.md に README 作成ガイドラインを追加

  この変更は、日本語圏のユーザーにとってライブラリの理解と使用を容易にすることを目的としています。

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

- [#74](https://github.com/salvage0707/notion-md-converter/pull/74) [`113347b`](https://github.com/salvage0707/notion-md-converter/commit/113347bf649320a48b580ce1b08d429305950680) Thanks [@salvage0707](https://github.com/salvage0707)! - - MarkdownUtils.richTextsToMarkdown を削除
  - 各 Factory に context を追加し、tools プロパティから共通的な formatter を使う実装に変更
  - BasicRichTextFormatter クラスを追加
    - リッチテキストの変換処理を実行するクラス

### Patch Changes

- [#77](https://github.com/salvage0707/notion-md-converter/pull/77) [`9a908e6`](https://github.com/salvage0707/notion-md-converter/commit/9a908e69928125f5efbaaf9347fefbb16f9f3425) Thanks [@salvage0707](https://github.com/salvage0707)! - サポートなしの場合の空行の出力で改行されないようにする

## 0.8.0

## 0.7.4

## 0.7.3

## 0.7.2

## 0.7.1

## 0.7.0

## 0.6.3
