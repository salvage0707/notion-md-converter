#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
  console.error("notion-md-converter MCP server started");
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});