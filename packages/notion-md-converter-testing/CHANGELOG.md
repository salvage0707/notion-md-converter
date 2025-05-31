# @notion-md-converter/testing

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

## 0.8.0

## 0.7.4

## 0.7.3

## 0.7.2

## 0.7.1

## 0.7.0

## 0.6.3
