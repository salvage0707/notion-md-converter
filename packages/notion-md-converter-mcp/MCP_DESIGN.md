# notion-md-converter-mcp 設計ドキュメント

## 概要

`@notion-md-converter/mcp`は、notion-md-converterのコア機能をModel Context Protocol (MCP)サーバーとして公開するシンプルなパッケージです。これにより、AIアシスタントがNotionコンテンツをMarkdownに変換する機能に直接アクセスできるようになります。

## パッケージ情報

- **パッケージ名**: `@notion-md-converter/mcp`
- **バージョン**: `0.10.0` (他のパッケージと統一)
- **説明**: MCP server for Notion to Markdown conversion
- **Node.js要件**: >=24.0.0

## アーキテクチャ設計

### 1. MCPサーバー構成

```
notion-md-converter-mcp/
├── src/
│   ├── index.ts                 # MCPサーバーのエントリーポイント
│   ├── server.ts                # MCPサーバーの初期化と設定
│   ├── tools/                   # MCPツールの実装
│   │   └── convert.ts           # 変換ツール
│   └── types/                   # TypeScript型定義
│       └── index.ts
├── bin/
│   └── notion-md-converter-mcp  # 実行可能ファイル
├── package.json
├── tsconfig.json
└── README.md
```


### 2. 主要コンポーネント

#### MCPツール: `convertNotionToMarkdown`

シンプルな変換ツールを1つだけ提供します：

```typescript
{
  name: "convertNotionToMarkdown",
  description: "NotionページまたはブロックをMarkdownに変換",
  inputSchema: {
    type: "object",
    properties: {
      notionId: {
        type: "string",
        description: "Notion page ID or URL"
      },
      notionToken: {
        type: "string",
        description: "Notion API token (optional, can use NOTION_TOKEN env var)"
      }
    },
    required: ["notionId"]
  }
}
```

### 3. 実装詳細

#### A. 依存関係
```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0",
    "@notion-md-converter/core": "workspace:*",
    "@notionhq/client": "catalog:"
  }
}
```

#### B. 実装方針

1. **シンプルな設計**
   - MCPツールは`convertNotionToMarkdown`のみ
   - プラットフォームは`core`のみサポート
   - 追加の検証ライブラリ（Zod）は使用しない

2. **エラーハンドリング**
   ```typescript
   try {
     // 変換処理
   } catch (error) {
     return {
       content: [{
         type: "text",
         text: `エラー: ${error.message}`
       }]
     };
   }
   ```

3. **環境変数**
   - `NOTION_TOKEN`: Notion APIトークン（オプション）

### 4. 使用例

#### A. CLIからの起動
```bash
# MCPサーバーを起動
npx @notion-md-converter/mcp

# または環境変数付き
NOTION_TOKEN=your-token npx @notion-md-converter/mcp
```

#### B. AIアシスタントからの使用
```json
{
  "tool": "convertNotionToMarkdown",
  "arguments": {
    "notionId": "abc123def456",
    "notionToken": "secret_xxx" // オプション
  }
}
```

#### C. 出力例
```json
{
  "content": [
    {
      "type": "text",
      "text": "# ページタイトル\n\n本文のMarkdown..."
    }
  ]
}
```

MCPプロトコルでは、ツールの戻り値は`content`配列として返す必要があります。各要素は`type`と`text`を持つオブジェクトです。

### 5. 実装の要点

1. **最小限の機能**
   - Notionページの取得
   - coreパッケージを使用したMarkdown変換
   - テキストとしての結果返却

2. **シンプルなエラー処理**
   - Notion APIエラー
   - ページが見つからない
   - 権限エラー

3. **stdio通信**
   - 標準入出力を使用したシンプルな通信
   - JSON-RPC 2.0プロトコル

## まとめ

notion-md-converter-mcpは、notion-md-converter-coreの機能をMCPツールとして公開する最小限のラッパーです。複雑な機能は含まず、シンプルにNotionページをMarkdownに変換する機能のみを提供します。