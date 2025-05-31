# @notion-md-converter/cli

## 0.11.0

### Minor Changes

- [#87](https://github.com/salvage0707/notion-md-converter/pull/87) [`073b6b6`](https://github.com/salvage0707/notion-md-converter/commit/073b6b68ca2464a16639d225da75272669835dfa) Thanks [@salvage0707](https://github.com/salvage0707)! - feat: add CLI package for converting Notion pages to Markdown

  - Add new `@notion-md-converter/cli` package with command-line interface
  - Support converting Notion pages to Markdown via `notion-md-cli convert` command
  - Accept both Notion page IDs and URLs as input
  - Remove deprecated warning from `$getPageFullContent` function in core package
  - Add comprehensive CLI documentation and examples

  この変更は新しいパッケージの追加なので major バージョンアップ、コアパッケージの軽微な変更は patch が適切です。

### Patch Changes

- Updated dependencies [[`073b6b6`](https://github.com/salvage0707/notion-md-converter/commit/073b6b68ca2464a16639d225da75272669835dfa)]:
  - @notion-md-converter/core@0.11.0
  - @notion-md-converter/types@0.11.0
