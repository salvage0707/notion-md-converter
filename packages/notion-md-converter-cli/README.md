# @notion-md-converter/cli

NotionページをMarkdownに変換するCLIツール。

## 🚀 インストール

### **npxを使用（推奨）**

```shell
npx @notion-md-converter/cli convert -p <PAGE_ID_OR_URL> -t <NOTION_TOKEN>
```

### **グローバルインストール**

```shell
npm install -g @notion-md-converter/cli
```

## 📖 使い方

> APIキーを取得するには、Notionのスタートガイドに従ってください。

### 基本的な例

NotionページをMarkdownに変換して標準出力に表示：

```shell
npx @notion-md-converter/cli convert --page <PAGE_ID_OR_URL> --token <NOTION_TOKEN>
```

### コマンドオプション

- `-p, --page <pageId>`: NotionページIDまたはURL（必須）
- `-t, --token <token>`: Notion APIトークン（必須）
- `-h, --help`: コマンドのヘルプを表示
- `-V, --version`: バージョン番号を出力

### 使用例

**ページIDを使用：**
```shell
npx @notion-md-converter/cli convert -p 12345678901234567890123456789012 -t secret_abc123
```

**ページURLを使用：**
```shell
npx @notion-md-converter/cli convert -p "https://www.notion.so/My-Page-12345678901234567890123456789012" -t secret_abc123
```

**ファイルに保存：**
```shell
npx @notion-md-converter/cli convert -p <PAGE_ID> -t <TOKEN> > output.md
```

**環境変数を使用：**
```shell
export NOTION_TOKEN="secret_abc123"
npx @notion-md-converter/cli convert -p <PAGE_ID> -t $NOTION_TOKEN
```

## Notion APIトークンの取得

1. [Notion Developers](https://www.notion.so/my-integrations)にアクセス
2. 「New integration」をクリック
3. 名前を付けてワークスペースを選択
4. 「Internal Integration Token」をコピー
5. ページをインテグレーションと共有：
   - Notionでページを開く
   - 「共有」→「招待」をクリック
   - インテグレーション名を検索して招待

## サポートされているページ形式

CLIはページIDとURLの両方を受け入れます：

- **ページID**: `12345678901234567890123456789012`
- **ハイフン付きページID**: `12345678-9012-3456-7890-123456789012`
- **Notion URL**: `https://www.notion.so/Page-Title-12345678901234567890123456789012`

## エラーハンドリング

CLIは一般的な問題に対して明確なエラーメッセージを提供します：

- 無効なページIDまたはURL形式
- 無効または期限切れのNotion APIトークン
- ページが見つからない、またはアクセスが拒否された
- ネットワーク接続の問題

終了コード：
- `0`: 成功
- `1`: エラー発生

## ライセンス

MITライセンスの下で配布されています。詳細は[LICENSE](https://github.com/salvage0707/notion-md-converter/blob/main/LICENSE)を参照してください。

## 作者

malvageee (https://github.com/salvage0707)