export interface ConvertToolInput {
  notionId: string;
  notionToken?: string;
}

// MCP SDKの期待する型に合わせて修正
export interface MCPContent {
  [x: string]: unknown; // インデックスシグネチャを追加
  type: "text";
  text: string;
}

export interface MCPToolResponse {
  [x: string]: unknown; // インデックスシグネチャを追加
  content: MCPContent[];
}
