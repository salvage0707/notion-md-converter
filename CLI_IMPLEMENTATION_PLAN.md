# CLIパッケージ実装計画

## 概要
notion-md-converterモノレポに新しいCLIパッケージ `@notion-md-converter/cli` を追加し、シンプルなMarkdown出力機能を提供する。

## パッケージ構成

### パッケージディレクトリ構造
```
packages/notion-md-converter-cli/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # CLIエントリーポイント
│   ├── cli.ts            # CLIコマンド定義とオプション解析
│   ├── commands/
│   │   └── convert.ts    # 変換コマンドの実装
│   └── utils/
│       ├── notion.ts     # Notion API関連ユーティリティ
│       └── output.ts     # 出力処理ユーティリティ
├── bin/
│   └── notion-md-cli     # 実行可能ファイル（shebang付き）
└── dist/                 # ビルド出力
```

## 技術スタック

### CLIライブラリ
- **commander.js**: 最も人気のあるNode.js CLIライブラリ
  - オプション解析
  - サブコマンド対応
  - ヘルプ生成
  - バリデーション

### 依存関係
- `@notion-md-converter/core`: コア変換ロジック
- `@notion-md-converter/types`: 型定義
- `@notionhq/client`: Notion API クライアント
- `commander`: CLI フレームワーク

## CLI仕様

### コマンド構文
```bash
notion-md-cli convert --page <PAGE_ID_OR_URL> --token <NOTION_TOKEN> [options]
```

### オプション
- `--page, -p <value>`: ページIDまたはページURL（必須）
- `--token, -t <value>`: Notion APIトークン（必須）
- `--help, -h`: ヘルプ表示
- `--version, -v`: バージョン表示

### 環境変数サポート
- `NOTION_TOKEN`: tokenオプションの代替

## 実装ステップ

### Phase 1: 基本構造作成
1. パッケージディレクトリ作成
2. package.json設定
3. tsconfig.json設定
4. 基本的なCLIエントリーポイント作成

### Phase 2: CLI実装
1. commander.jsを使用したCLI骨格作成
2. オプション解析とバリデーション
3. Notion APIクライアント初期化
4. ページID/URLからページデータ取得

### Phase 3: 変換処理
1. Notionページデータを@notion-md-converter/coreで変換
2. Markdown出力（stdout）

### Phase 4: エラーハンドリングとテスト
1. エラーハンドリング強化
2. ユニットテスト作成
3. 統合テスト作成

## パッケージ設定

### package.json
```json
{
  "name": "@notion-md-converter/cli",
  "version": "0.1.0",
  "description": "CLI tool for converting Notion pages to Markdown",
  "main": "dist/index.js",
  "bin": {
    "notion-md-cli": "bin/notion-md-cli"
  },
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c --watch",
    "test": "vitest",
    "test:once": "vitest run"
  },
  "dependencies": {
    "@notion-md-converter/core": "workspace:*",
    "@notion-md-converter/types": "workspace:*",
    "@notionhq/client": "^2.2.3",
    "commander": "^11.1.0"
  }
}
```

### bin/notion-md-cli
```bash
#!/usr/bin/env node
require('../dist/index.js');
```

## エラーハンドリング

### 想定エラーケース
1. 無効なNotion APIトークン
2. 存在しないページID/URL
3. アクセス権限不足
4. ネットワークエラー
5. 無効なコマンドライン引数

### エラー出力形式
- 適切なexit code設定
- 分かりやすいエラーメッセージ
- デバッグ情報（--verboseオプション時）

## テスト戦略

### ユニットテスト
- CLI オプション解析テスト
- Notion API クライアント初期化テスト
- 変換処理テスト（モック使用）

### 統合テスト
- 実際のNotion APIを使用した動作確認
- stdout出力テスト

## 将来的な拡張可能性

### 追加機能候補
- 複数ページの一括変換
- 設定ファイル対応
- プラットフォーム固有出力オプション（--zenn, --qiita等）
- キャッシュ機能
- 進捗表示

## モノレポ統合

### workspace設定
- pnpm-workspace.yamlに追加
- turbo.jsonにビルド設定追加
- 既存のコード品質チェック適用

### CI/CD
- 既存のビルド・テスト・リントプロセスに統合
- パッケージ公開プロセスに含める