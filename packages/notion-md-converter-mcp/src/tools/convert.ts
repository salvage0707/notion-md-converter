import {
  $getPageFullContent,
  NotionMarkdownConverter,
  extractPageId,
} from "@notion-md-converter/core";
import { Client } from "@notionhq/client";
import type { MCPToolResponse } from "../types/index.js";

export async function convertNotionToMarkdown(notionId: string): Promise<MCPToolResponse> {
  try {
    // Notion APIトークンの取得（環境変数からのみ）
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      throw new Error(
        "Notion APIトークンが環境変数に設定されていません。NOTION_TOKEN環境変数を設定してください。",
      );
    }

    // Notion IDの正規化（URLからIDを抽出）
    const pageId = extractPageId(notionId);

    // Notionクライアントの初期化
    const notionClient = new Client({ auth: token });

    // ページコンテンツ（ブロック）の取得
    const blocks = await $getPageFullContent(notionClient, pageId);

    // コンバーターの初期化
    const converter = new NotionMarkdownConverter();

    // Markdownに変換
    const markdown = converter.execute(blocks);

    return {
      content: [
        {
          type: "text",
          text: markdown,
        },
      ],
    };
  } catch (error) {
    // エラーハンドリング
    const errorMessage = error instanceof Error ? error.message : "不明なエラーが発生しました";
    return {
      content: [
        {
          type: "text",
          text: `エラー: ${errorMessage}`,
        },
      ],
    };
  }
}
