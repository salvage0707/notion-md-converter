import { Client } from "@notionhq/client";

export function createNotionClient(token: string): Client {
  return new Client({
    auth: token,
  });
}
