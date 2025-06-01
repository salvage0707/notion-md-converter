# @notion-md-converter/core 使用例

このディレクトリには、@notion-md-converter/coreライブラリの使用方法を示す例が含まれています。これらの例は、NotionコンテンツをMarkdown形式に変換する様々な方法を示しています。

## 前提条件

1. **環境変数の設定**
   `.env.example`ファイルを`.env`にコピーし、以下の変数を設定してください：
   ```
   NOTION_API_SECRET=your_notion_api_secret
   NOTION_PAGE_ID=your_notion_page_id
   NOTION_DATABASE_ID=your_notion_database_id
   ```
   - `NOTION_API_SECRET`: Notion APIインテグレーショントークン（[トークンの取得はこちら](https://developers.notion.com/docs/authorization#internal-integration-auth-flow-set-up)）
   - `NOTION_PAGE_ID`: 変換したいNotionページのID
   - `NOTION_DATABASE_ID`: エクスポートしたいNotionデータベースのID

2. **依存関係のインストール**
   ```sh
   $ pnpm install
   ```

## 例

### シンプルなエクスポート

NotionコンテンツをMarkdown形式にエクスポートする基本的な例。この例はライブラリの基本的な使用方法を示しています。

```sh
# シンプルなエクスポートの例を実行
$ pnpm run core:simple-export
```

### カスタムエクスポート

Markdown変換プロセスをカスタマイズする方法を示す例。この例では、出力形式を変更するためのカスタムトランスフォーマーの作成と使用方法を示しています。

```sh
# カスタムエクスポートの例を実行
$ pnpm run core:custom-export
```

### データベースページのエクスポート

Notionデータベースからすべてのページをエクスポートする方法を示す例。この例では、データベースIDを指定して複数のページを変換する方法を示しています。

```sh
# データベースページのエクスポートの例を実行
$ pnpm run core:database-page-exports
```