import { Client } from "@notionhq/client";

export function createNotionClient(token: string): Client {
  return new Client({
    auth: token,
  });
}

export function extractPageId(pageInput: string): string {
  if (pageInput.includes("notion.so")) {
    const match = pageInput.match(
      /([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/,
    );
    if (!match) {
      throw new Error("Invalid Notion page URL format");
    }
    return match[1].replace(/-/g, "");
  }

  const cleanId = pageInput.replace(/-/g, "");
  if (!/^[a-f0-9]{32}$/i.test(cleanId)) {
    throw new Error("Invalid page ID format");
  }

  return cleanId;
}
