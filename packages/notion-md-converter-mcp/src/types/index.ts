export interface ConvertToolInput {
  notionId: string;
  notionToken?: string;
}

export interface MCPContent {
  type: "text";
  text: string;
}

export interface MCPToolResponse {
  content: MCPContent[];
}