# @notion-md-converter/mcp

NotionからMarkdownへの変換用MCP（Model Context Protocol）サーバー。

## 概要

このパッケージは、`@notion-md-converter/core`の機能をAIアシスタントに公開するMCPサーバーを提供し、Notionコンテンツを直接Markdownに変換できるようにします。

## インストール

```bash
npm install @notion-md-converter/mcp
```

## 使い方

### MCPサーバーの実行

```bash
# MCPサーバーを起動
npx @notion-md-converter/mcp

# または環境変数を使用
NOTION_TOKEN=your-token npx @notion-md-converter/mcp
```

### 利用可能なツール

#### `convertNotionToMarkdown`

NotionページをMarkdown形式に変換します。

**入力スキーマ：**
- `notionId` (string, 必須): NotionページIDまたはURL
- `notionToken` (string, オプション): Notion APIトークン（NOTION_TOKEN環境変数も使用可能）

**例：**
```json
{
  "tool": "convertNotionToMarkdown",
  "arguments": {
    "notionId": "abc123def456",
    "notionToken": "secret_xxx"
  }
}
```

**出力：**
```json
{
  "content": [
    {
      "type": "text",
      "text": "# ページタイトル\n\n変換されたマークダウンコンテンツ..."
    }
  ]
}
```

## 設定

### 環境変数

- `NOTION_TOKEN`: Notion APIトークン（オプション、引数として渡すことも可能）

## エラーハンドリング

サーバーは一般的なエラーを適切に処理します：
- Notion APIエラー
- ページが見つからない
- 権限エラー

エラーはコンテンツ配列内の標準MCP形式で返されます。

## ライセンス

MIT