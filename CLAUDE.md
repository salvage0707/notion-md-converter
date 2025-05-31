# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**notion-md-converter**は、Notionブロックをプラットフォーム固有のMarkdownテキストに変換するTypeScriptモノレポです。拡張可能なトランスフォーマーアーキテクチャで複数の出力形式（Zenn、Qiita、はてなブログ）をサポートしています。

## リポジトリ構造

### モノレポアーキテクチャ
- **モノレポ管理**: pnpm workspaces + Turborepoによるビルドオーケストレーション
- **パッケージマネージャー**: pnpm v9.15.1（packageManagerフィールドで指定）
- **ビルドシステム**: パッケージビルドにRollup、型チェックにTypeScript
- **テスト**: globalsが有効なVitest
- **コード品質**: フォーマット、リント、インポート整理にBiome

### コアパッケージ（packages/）
- `@notion-md-converter/core` - ベーストランスフォーマーを含むコア変換エンジン
- `@notion-md-converter/types` - 共有TypeScript型とインターフェース
- `@notion-md-converter/testing` - モックNotionブロック作成用テストユーティリティ
- `@notion-md-converter/zenn` - Zenn固有のトランスフォーマーオーバーライド
- `@notion-md-converter/qiita` - Qiita固有のトランスフォーマーオーバーライド
- `@notion-md-converter/hatena-blog` - はてなブログ固有のトランスフォーマーオーバーライド
- `@notion-md-converter/config` - 共有ビルドとTypeScript設定

### プラットフォーム固有コンバーター
各プラットフォームパッケージ（zenn、qiita、hatena-blog）は、プラットフォーム固有のMarkdown記法（コールアウト、コードブロック、埋め込みなど）用のカスタムトランスフォーマーでコアコンバーターを拡張します。

## 開発コマンド

### ビルド
```bash
# 全パッケージをビルド
pnpm build

# 全distディレクトリをクリーン
pnpm build:clean

# サイズ解析付きビルド
pnpm build:size
```

### テスト
```bash
# ウォッチモードでテスト実行
pnpm test

# テストを1回実行
pnpm test:once

# 型チェック
pnpm check-types
```

### コード品質
```bash
# コードフォーマット
pnpm format:fix

# リントと修正
pnpm lint:fix

# フォーマット + リントのチェックと修正
pnpm check:fix
```

### 開発
```bash
# ウォッチモードで実行（変更時にパッケージをビルド）
pnpm dev
```

### 公開
```bash
# 完全なリリースプロセス: チェック → ビルド → テスト → バージョン → 公開
pnpm publish-packages
```

## アーキテクチャパターン

### トランスフォーマーファクトリーパターン
コア変換ロジックは、各Notionブロックタイプ用のトランスフォーマーを作成するファクトリー関数を使用します。各トランスフォーマーはコンテキストオブジェクトを受け取り、Markdownテキストを返します。

### プラットフォーム拡張戦略
プラットフォーム固有パッケージは、特化した実装を提供することでコアトランスフォーマーをオーバーライドします（例：同じNotionコールアウトブロックに対してZennコールアウト vs Qiitaノート）。

### キャプション内メタデータ
ライブラリは、追加のレンダリング指示のために`key=value&key2=value2:実際のキャプション`形式を使用してNotionブロックキャプションからメタデータを解析します。

### テスト戦略
`@notion-md-converter/testing`パッケージを使用してトランスフォーマーテスト用のモックNotionブロックを作成し、`createHeading1Block()`や`createTransformerContext()`などのユーティリティを提供します。

## コード品質基準

- **フォーマット**: 2スペースインデント、100文字行幅、ダブルクォート、末尾カンマ
- **TypeScript**: 厳格モード有効、全トランスフォーマーの適切な型付け
- **テスト**: ソースファイルと並行してテストファイル（`.test.ts`サフィックス）
- **ビルド出力**: TypeScript宣言付きデュアルESM/CJS

## exampleディレクトリ

環境設定と異なるコンバーター設定での実際の使用パターンを示す各プラットフォーム用の動作例が含まれています。

## プロジェクトの進行

日本語でプロジェクトを進めます。