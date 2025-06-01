# @notion-md-converter/mcp

## 0.12.1

### Patch Changes

- [#92](https://github.com/salvage0707/notion-md-converter/pull/92) [`b36dd62`](https://github.com/salvage0707/notion-md-converter/commit/b36dd629626548643e484384266550e748d332bf) Thanks [@salvage0707](https://github.com/salvage0707)! - ドキュメントを日本語に翻訳

  - すべての README ファイルを日本語に翻訳しました
  - 技術用語とテーブルヘッダーは英語のまま維持
  - note.com の対応予定を削除（今後対応しないため）
  - はてなブログの対応ステータスを「対応済み」に更新
  - CLAUDE.md に README 作成ガイドラインを追加

  この変更は、日本語圏のユーザーにとってライブラリの理解と使用を容易にすることを目的としています。

- Updated dependencies [[`b36dd62`](https://github.com/salvage0707/notion-md-converter/commit/b36dd629626548643e484384266550e748d332bf)]:
  - @notion-md-converter/core@0.12.1

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

### Patch Changes

- Updated dependencies [[`44aec87`](https://github.com/salvage0707/notion-md-converter/commit/44aec8744277a41a1e208f1b84a131f0d72def8b)]:
  - @notion-md-converter/core@0.12.0
