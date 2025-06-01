import type { Block } from "@notion-md-converter/types";
import type { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { type MockedFunction, beforeEach, describe, expect, it, vi } from "vitest";
import { $getPageFullContent, extractPageId, retryWithBackoff } from "./notion";

describe("extractPageId", () => {
  it("Notion URLからページIDを抽出できる", () => {
    const url = "https://www.notion.so/Test-Page-12345678901234567890123456789012";
    const result = extractPageId(url);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("UUID形式のNotion URLからページIDを抽出できる", () => {
    const url = "https://www.notion.so/Test-Page-12345678-9012-3456-7890-123456789012";
    const result = extractPageId(url);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("クリーンなページIDが与えられた場合はそのまま返す", () => {
    const id = "12345678901234567890123456789012";
    const result = extractPageId(id);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("ハイフン付きのページIDをクリーンにできる", () => {
    const id = "12345678-9012-3456-7890-123456789012";
    const result = extractPageId(id);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("無効なURLに対してエラーを投げる", () => {
    const invalidUrl = "https://www.notion.so/invalid-url";
    expect(() => extractPageId(invalidUrl)).toThrow("Invalid Notion page URL format");
  });

  it("無効なページIDに対してエラーを投げる", () => {
    const invalidId = "invalid-id";
    expect(() => extractPageId(invalidId)).toThrow("Invalid page ID format");
  });
});

describe("retryWithBackoff", () => {
  it("1回目で成功する", async () => {
    const mockFn = vi.fn().mockResolvedValue("success");

    const result = await retryWithBackoff(mockFn);

    expect(result).toBe("success");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("rate_limitedエラー時にリトライして最終的に成功する", async () => {
    const mockFn = vi
      .fn()
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockResolvedValue("success");

    vi.spyOn(global, "setTimeout").mockImplementation((fn) => {
      fn();
      return {} as NodeJS.Timeout;
    });

    const result = await retryWithBackoff(mockFn, 3, 100);

    expect(result).toBe("success");
    expect(mockFn).toHaveBeenCalledTimes(3);

    vi.restoreAllMocks();
  });

  it("rate_limited以外のエラー時はリトライしない", async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error("Other error"));

    await expect(retryWithBackoff(mockFn)).rejects.toThrow("Other error");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("rate_limitedエラーで最大リトライ回数後にエラーを投げる", async () => {
    const mockFn = vi.fn().mockRejectedValue({ code: "rate_limited" });

    vi.spyOn(global, "setTimeout").mockImplementation((fn) => {
      fn();
      return {} as NodeJS.Timeout;
    });

    await expect(retryWithBackoff(mockFn, 2, 100)).rejects.toEqual({ code: "rate_limited" });
    expect(mockFn).toHaveBeenCalledTimes(2);

    vi.restoreAllMocks();
  });

  it("エクスポネンシャルバックオフの遅延を使用する", async () => {
    const mockFn = vi
      .fn()
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockResolvedValue("success");

    const setTimeoutSpy = vi.spyOn(global, "setTimeout").mockImplementation((fn) => {
      fn();
      return {} as NodeJS.Timeout;
    });

    await retryWithBackoff(mockFn, 3, 100);

    expect(setTimeoutSpy).toHaveBeenNthCalledWith(1, expect.any(Function), 100); // 100 * 2^0
    expect(setTimeoutSpy).toHaveBeenNthCalledWith(2, expect.any(Function), 200); // 100 * 2^1

    vi.restoreAllMocks();
  });

  it("不正な形式のエラーオブジェクトではリトライしない", async () => {
    const mockFn = vi.fn().mockRejectedValue({ someOtherProperty: "value" });

    await expect(retryWithBackoff(mockFn)).rejects.toEqual({ someOtherProperty: "value" });
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe("$getPageFullContent", () => {
  let mockClient: Client;
  let mockList: MockedFunction<() => Promise<ListBlockChildrenResponse>>;

  beforeEach(() => {
    mockList = vi.fn();
    mockClient = {
      blocks: {
        children: {
          list: mockList,
        },
      },
    } as unknown as Client;
  });

  it("子ブロックのないページコンテンツを取得できる", async () => {
    const mockBlocks: BlockObjectResponse[] = [
      {
        object: "block",
        id: "block-1",
        type: "paragraph",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        paragraph: { rich_text: [], color: "default" },
      },
      {
        object: "block",
        id: "block-2",
        type: "heading_1",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        // cspell:disable-next-line
        heading_1: { rich_text: [], color: "default", is_toggleable: false },
      },
    ];

    mockList.mockResolvedValue({
      object: "list",
      results: mockBlocks,
      has_more: false,
      next_cursor: null,
      type: "block",
      block: {},
    });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ ...mockBlocks[0], children: [] });
    expect(result[1]).toEqual({ ...mockBlocks[1], children: [] });
    expect(mockList).toHaveBeenCalledWith({
      block_id: "page-id",
      start_cursor: undefined,
    });
  });

  it("ページネーション付きのコンテンツを取得できる", async () => {
    const mockBlocks1: BlockObjectResponse[] = [
      {
        object: "block",
        id: "block-1",
        type: "paragraph",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        paragraph: { rich_text: [], color: "default" },
      },
    ];

    const mockBlocks2: BlockObjectResponse[] = [
      {
        object: "block",
        id: "block-2",
        type: "heading_1",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        // cspell:disable-next-line
        heading_1: { rich_text: [], color: "default", is_toggleable: false },
      },
    ];

    mockList
      .mockResolvedValueOnce({
        object: "list",
        results: mockBlocks1,
        has_more: true,
        next_cursor: "cursor-1",
        type: "block",
        block: {},
      })
      .mockResolvedValueOnce({
        object: "list",
        results: mockBlocks2,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(2);
    expect(mockList).toHaveBeenCalledTimes(2);
    expect(mockList).toHaveBeenNthCalledWith(1, {
      block_id: "page-id",
      start_cursor: undefined,
    });
    expect(mockList).toHaveBeenNthCalledWith(2, {
      block_id: "page-id",
      start_cursor: "cursor-1",
    });
  });

  it("子ブロックを持つブロックを再帰的に取得できる", async () => {
    const mockParentBlocks: BlockObjectResponse[] = [
      {
        object: "block",
        id: "parent-block",
        type: "callout",
        has_children: true,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        callout: { rich_text: [], icon: null, color: "default" },
      },
    ];

    const mockChildBlocks: BlockObjectResponse[] = [
      {
        object: "block",
        id: "child-block",
        type: "paragraph",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "block_id", block_id: "parent-block" },
        archived: false,
        in_trash: false,
        paragraph: { rich_text: [], color: "default" },
      },
    ];

    mockList
      .mockResolvedValueOnce({
        object: "list",
        results: mockParentBlocks,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      })
      .mockResolvedValueOnce({
        object: "list",
        results: mockChildBlocks,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(1);
    const firstBlock = result[0] as Block & { children: Block[] };
    expect(firstBlock.children).toHaveLength(1);
    expect(firstBlock.children[0]).toEqual({ ...mockChildBlocks[0], children: [] });
    expect(mockList).toHaveBeenCalledTimes(2);
  });

  it("ネストした子ブロックを深く再帰的に取得できる", async () => {
    const mockLevel1: BlockObjectResponse[] = [
      {
        object: "block",
        id: "level-1-block",
        type: "toggle",
        has_children: true,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        toggle: { rich_text: [], color: "default" },
      },
    ];

    const mockLevel2: BlockObjectResponse[] = [
      {
        object: "block",
        id: "level-2-block",
        type: "bulleted_list_item",
        has_children: true,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "block_id", block_id: "level-1-block" },
        archived: false,
        in_trash: false,
        bulleted_list_item: { rich_text: [], color: "default" },
      },
    ];

    const mockLevel3: BlockObjectResponse[] = [
      {
        object: "block",
        id: "level-3-block",
        type: "paragraph",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "block_id", block_id: "level-2-block" },
        archived: false,
        in_trash: false,
        paragraph: { rich_text: [], color: "default" },
      },
    ];

    mockList
      .mockResolvedValueOnce({
        object: "list",
        results: mockLevel1,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      })
      .mockResolvedValueOnce({
        object: "list",
        results: mockLevel2,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      })
      .mockResolvedValueOnce({
        object: "list",
        results: mockLevel3,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(1);
    const firstBlock = result[0] as Block & { children: Block[] };
    const secondLevelBlock = firstBlock.children[0] as Block & { children: Block[] };
    expect(firstBlock.children).toHaveLength(1);
    expect(secondLevelBlock.children).toHaveLength(1);
    expect(secondLevelBlock.children[0]).toEqual({ ...mockLevel3[0], children: [] });
    expect(mockList).toHaveBeenCalledTimes(3);
  });

  it("不完全なブロックに対してエラーを投げる", async () => {
    const incompleteBlock = {
      object: "block",
      id: "incomplete-block",
      // typeプロパティが欠けている不完全なブロック
    } as BlockObjectResponse;

    mockList.mockResolvedValue({
      object: "list",
      results: [incompleteBlock],
      has_more: false,
      next_cursor: null,
      type: "block",
      block: {},
    });

    await expect($getPageFullContent(mockClient, "page-id")).rejects.toThrow("Block is not full");
  });

  it("API呼び出しでエラーが発生した場合は伝播する", async () => {
    mockList.mockRejectedValue(new Error("API Error"));

    await expect($getPageFullContent(mockClient, "page-id")).rejects.toThrow("API Error");
  });

  it("複数の子ブロックを並列で取得する", async () => {
    const mockParentBlocks: BlockObjectResponse[] = [
      {
        object: "block",
        id: "parent-1",
        type: "callout",
        has_children: true,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        callout: { rich_text: [], icon: null, color: "default" },
      },
      {
        object: "block",
        id: "parent-2",
        type: "toggle",
        has_children: true,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "page_id", page_id: "page-id" },
        archived: false,
        in_trash: false,
        toggle: { rich_text: [], color: "default" },
      },
    ];

    const mockChild1: BlockObjectResponse[] = [
      {
        object: "block",
        id: "child-1",
        type: "paragraph",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "block_id", block_id: "parent-1" },
        archived: false,
        in_trash: false,
        paragraph: { rich_text: [], color: "default" },
      },
    ];

    const mockChild2: BlockObjectResponse[] = [
      {
        object: "block",
        id: "child-2",
        type: "paragraph",
        has_children: false,
        created_time: "2023-01-01T00:00:00.000Z",
        last_edited_time: "2023-01-01T00:00:00.000Z",
        created_by: { object: "user", id: "user-id" },
        last_edited_by: { object: "user", id: "user-id" },
        parent: { type: "block_id", block_id: "parent-2" },
        archived: false,
        in_trash: false,
        paragraph: { rich_text: [], color: "default" },
      },
    ];

    mockList
      .mockResolvedValueOnce({
        object: "list",
        results: mockParentBlocks,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      })
      .mockResolvedValueOnce({
        object: "list",
        results: mockChild1,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      })
      .mockResolvedValueOnce({
        object: "list",
        results: mockChild2,
        has_more: false,
        next_cursor: null,
        type: "block",
        block: {},
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(2);
    const firstBlock = result[0] as Block & { children: Block[] };
    const secondBlock = result[1] as Block & { children: Block[] };
    expect(firstBlock.children).toHaveLength(1);
    expect(secondBlock.children).toHaveLength(1);
    expect(firstBlock.children[0].id).toBe("child-1");
    expect(secondBlock.children[0].id).toBe("child-2");
    expect(mockList).toHaveBeenCalledTimes(3);
  });
});
