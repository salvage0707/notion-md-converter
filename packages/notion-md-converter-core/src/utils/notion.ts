import type {
  Block,
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListItemBlock,
  CalloutBlock,
  CodeBlock,
  ColumnBlock,
  ColumnListBlock,
  DividerBlock,
  EmbedBlock,
  EquationBlock,
  FileBlock,
  FileObject,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  LinkPreviewBlock,
  NotionExternalFile,
  NotionInternalFile,
  NumberedListItemBlock,
  ParagraphBlock,
  PdfBlock,
  QuoteBlock,
  RootBlock,
  RootBlockType,
  SyncedBlock,
  TableBlock,
  TableOfContentsBlock,
  TableRowBlock,
  ToDoBlock,
  ToggleBlock,
  VideoBlock,
} from "@notion-md-converter/types";
import { type Client, isFullBlock } from "@notionhq/client";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const ROOT_BLOCK_TYPES = [
  "bookmark",
  "breadcrumb",
  "bulleted_list_item",
  "callout",
  "code",
  "column_list",
  "column",
  "divider",
  "equation",
  "file",
  "heading_1",
  "heading_2",
  "heading_3",
  "image",
  "link_preview",
  "pdf",
  "quote",
  "synced_block",
  "numbered_list_item",
  "table",
  "table_of_contents",
  "to_do",
  "toggle",
  "video",
  "paragraph",
  "embed",
  "child_database",
  "child_page",
] as const satisfies RootBlockType[];

export const isRootBlock = (block: Block): block is RootBlock => {
  return block.object === "block" && (ROOT_BLOCK_TYPES as readonly string[]).includes(block.type);
};

export const isNotionInternalFile = (file: FileObject): file is NotionInternalFile => {
  return file.type === "file";
};

export const isNotionExternalFile = (file: FileObject): file is NotionExternalFile => {
  return file.type === "external";
};

export const isBookmarkBlock = (block: Block): block is BookmarkBlock => {
  return block.type === "bookmark";
};

export const isBreadcrumbBlock = (block: Block): block is BreadcrumbBlock => {
  return block.type === "breadcrumb";
};

export const isBulletedListItemBlock = (block: Block): block is BulletedListItemBlock => {
  return block.type === "bulleted_list_item" && Array.isArray(block.children);
};

export const isCalloutBlock = (block: Block): block is CalloutBlock => {
  return block.type === "callout" && Array.isArray(block.children);
};

export const isCodeBlock = (block: Block): block is CodeBlock => {
  return block.type === "code";
};

export const isColumnListBlock = (block: Block): block is ColumnListBlock => {
  return block.type === "column_list" && Array.isArray(block.children);
};

export const isColumnBlock = (block: Block): block is ColumnBlock => {
  return block.type === "column" && Array.isArray(block.children);
};

export const isDividerBlock = (block: Block): block is DividerBlock => {
  return block.type === "divider";
};

export const isEquationBlock = (block: Block): block is EquationBlock => {
  return block.type === "equation";
};

export const isFileBlock = (block: Block): block is FileBlock => {
  return block.type === "file";
};

export const isHeading1Block = (block: Block): block is Heading1Block => {
  return block.type === "heading_1";
};

export const isHeading2Block = (block: Block): block is Heading2Block => {
  return block.type === "heading_2";
};

export const isHeading3Block = (block: Block): block is Heading3Block => {
  return block.type === "heading_3";
};

export const isImageBlock = (block: Block): block is ImageBlock => {
  return block.type === "image";
};

export const isLinkPreviewBlock = (block: Block): block is LinkPreviewBlock => {
  return block.type === "link_preview";
};

export const isNumberedListItemBlock = (block: Block): block is NumberedListItemBlock => {
  return block.type === "numbered_list_item" && Array.isArray(block.children);
};

export const isParagraphBlock = (block: Block): block is ParagraphBlock => {
  return block.type === "paragraph" && Array.isArray(block.children);
};

export const isPdfBlock = (block: Block): block is PdfBlock => {
  return block.type === "pdf";
};

export const isQuoteBlock = (block: Block): block is QuoteBlock => {
  return block.type === "quote";
};

export const isSyncedBlock = (block: Block): block is SyncedBlock => {
  return block.type === "synced_block" && Array.isArray(block.children);
};

export const isTableBlock = (block: Block): block is TableBlock => {
  return block.type === "table" && Array.isArray(block.children);
};

export const isTableRowBlock = (block: Block): block is TableRowBlock => {
  return block.type === "table_row";
};

export const isTableOfContentsBlock = (block: Block): block is TableOfContentsBlock => {
  return block.type === "table_of_contents";
};

export const isToDoBlock = (block: Block): block is ToDoBlock => {
  return block.type === "to_do" && Array.isArray(block.children);
};

export const isToggleBlock = (block: Block): block is ToggleBlock => {
  return block.type === "toggle" && Array.isArray(block.children);
};

export const isVideoBlock = (block: Block): block is VideoBlock => {
  return block.type === "video";
};

export const isEmbedBlock = (block: Block): block is EmbedBlock => {
  return block.type === "embed";
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000,
): Promise<T> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      if (
        attempt === maxRetries - 1 ||
        !error ||
        typeof error !== "object" ||
        !("code" in error) ||
        error.code !== "rate_limited"
      ) {
        throw error;
      }

      const delayMs = baseDelay * 2 ** attempt;
      await delay(delayMs);
    }
  }
  throw new Error("Max retries reached");
};

class Semaphore {
  private permits: number;
  private waiting: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }

    return new Promise((resolve) => {
      this.waiting.push(resolve);
    });
  }

  release(): void {
    this.permits++;
    const next = this.waiting.shift();
    if (next) {
      this.permits--;
      next();
    }
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

/**
 * Please be aware that the API specification may change significantly.
 */
export const $getPageFullContent = async (
  client: Client,
  blockId: string,
  semaphore?: Semaphore,
) => {
  const apiSemaphore = semaphore || new Semaphore(3);
  // biome-ignore lint/suspicious/noExplicitAny: Notion API returns any
  const results: any[] = [];
  let nextCursor: string | undefined = undefined;

  while (true) {
    const res = await apiSemaphore.withLock(() =>
      retryWithBackoff(() =>
        client.blocks.children.list({
          block_id: blockId,
          start_cursor: nextCursor,
        }),
      ),
    );

    results.push(...res.results);
    if (!res.has_more) {
      break;
    }
    nextCursor = res.next_cursor ?? undefined;
  }

  // Validate blocks first
  for (const block of results) {
    if (!isFullBlock(block)) {
      throw new Error("Block is not full");
    }
  }

  // Process children recursively (pass semaphore to maintain concurrency control)
  const childrenPromises = results.map(async (block, index) => {
    if (block.has_children) {
      const children = await $getPageFullContent(client, block.id, apiSemaphore);
      return { index, children };
    }
    return { index, children: [] };
  });

  const childrenResults = await Promise.all(childrenPromises);

  // Apply results and handle failures
  for (const result of childrenResults) {
    results[result.index].children = result.children;
  }

  return results as Block[];
};

/**
 * @deprecated This function will be removed in a future release as we plan to remove the dependency on @notionhq/client.
 * Please be aware that the API specification may change significantly.
 */
export const $getDatabasePages = async (client: Client, databaseId: string) => {
  const results: QueryDatabaseResponse["results"] = [];
  let nextCursor: string | undefined = undefined;

  while (true) {
    const res = await retryWithBackoff(() =>
      client.databases.query({
        database_id: databaseId,
        start_cursor: nextCursor,
      }),
    );

    results.push(...res.results);
    nextCursor = res.next_cursor ?? undefined;
    if (!nextCursor) {
      break;
    }
  }
  return results;
};

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
