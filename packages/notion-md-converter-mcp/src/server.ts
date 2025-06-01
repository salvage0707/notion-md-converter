import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { convertNotionToMarkdown } from "./tools/convert.js";

export function createServer() {
  const server = new McpServer({
    name: "notion-md-converter",
    version: "0.10.0"
  });

  // convertNotionToMarkdownツールを登録
  // MCP SDKの現バージョンではZodが必要なため、最小限のZod使用
  server.tool(
    "convertNotionToMarkdown",
    {
      notionId: z.string().describe("Notion page ID or URL")
    },
    async ({ notionId }) => {
      // 必須パラメータは既にZodでバリデートされているため、チェック不要
      return convertNotionToMarkdown(notionId);
    }
  );

  return server;
}