---
"@notion-md-converter/core": minor
"@notion-md-converter/cli": minor
"@notion-md-converter/config": minor
"@notion-md-converter/hatena-blog": minor
"@notion-md-converter/qiita": minor
"@notion-md-converter/testing": minor
"@notion-md-converter/types": minor
"@notion-md-converter/zenn": minor
---

feat: add CLI package for converting Notion pages to Markdown

- Add new `@notion-md-converter/cli` package with command-line interface
- Support converting Notion pages to Markdown via `notion-md-cli convert` command
- Accept both Notion page IDs and URLs as input
- Remove deprecated warning from `$getPageFullContent` function in core package
- Add comprehensive CLI documentation and examples

この変更は新しいパッケージの追加なので major バージョンアップ、コアパッケージの軽微な変更は patch が適切です。
