import { Client } from "@notionhq/client";
import { NotionMarkdownConverter } from "@notion-md-converter/core";
import type { MCPToolResponse } from "../types/index.js";

export async function convertNotionToMarkdown(
  notionId: string
): Promise<MCPToolResponse> {
  try {
    // Notion APIトークンの取得（環境変数からのみ）
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      throw new Error("Notion APIトークンが環境変数に設定されていません。NOTION_TOKEN環境変数を設定してください。");
    }

    // Notion IDの正規化（URLからIDを抽出）
    const pageId = extractPageId(notionId);

    // Notionクライアントの初期化
    const notionClient = new Client({ auth: token });

    // ページの取得
    const page = await notionClient.pages.retrieve({ page_id: pageId });

    // ページタイトルの取得
    const title = getPageTitle(page);

    // ページコンテンツ（ブロック）の取得
    const blocks = await fetchAllBlocks(notionClient, pageId);

    // コンバーターの初期化
    const converter = new NotionMarkdownConverter();

    // Markdownに変換
    const markdown = converter.execute(blocks);

    // タイトルを含めた完全なMarkdownを返す
    const fullMarkdown = title ? `# ${title}\n\n${markdown}` : markdown;

    return {
      content: [{
        type: "text",
        text: fullMarkdown
      }]
    };
  } catch (error) {
    // エラーハンドリング
    const errorMessage = error instanceof Error ? error.message : "不明なエラーが発生しました";
    return {
      content: [{
        type: "text",
        text: `エラー: ${errorMessage}`
      }]
    };
  }
}

/**
 * NotionのURLまたはIDからページIDを抽出
 */
function extractPageId(notionIdOrUrl: string): string {
  // URLパターンのマッチング
  const urlPattern = /([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;
  const match = notionIdOrUrl.match(urlPattern);
  
  if (match) {
    // ハイフンなしのIDをハイフン付きに変換
    const id = match[1];
    if (id.length === 32 && !id.includes("-")) {
      return [
        id.substring(0, 8),
        id.substring(8, 12),
        id.substring(12, 16),
        id.substring(16, 20),
        id.substring(20, 32)
      ].join("-");
    }
    return id;
  }
  
  throw new Error(`無効なNotion IDまたはURL: ${notionIdOrUrl}`);
}

/**
 * ページタイトルを取得
 */
function getPageTitle(page: any): string {
  if (page.properties?.title?.title) {
    return page.properties.title.title
      .map((text: any) => text.plain_text)
      .join("");
  }
  
  // タイトルプロパティを探す
  for (const [, prop] of Object.entries(page.properties)) {
    if ((prop as any).type === "title" && (prop as any).title) {
      return (prop as any).title
        .map((text: any) => text.plain_text)
        .join("");
    }
  }
  
  return "";
}

/**
 * ページの全ブロックを再帰的に取得
 */
async function fetchAllBlocks(client: Client, blockId: string): Promise<any[]> {
  const blocks: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await client.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100
    });

    for (const block of response.results) {
      blocks.push(block);
      
      // 子ブロックを持つ場合は再帰的に取得
      if ((block as any).has_children) {
        const children = await fetchAllBlocks(client, block.id);
        (block as any).children = children;
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}