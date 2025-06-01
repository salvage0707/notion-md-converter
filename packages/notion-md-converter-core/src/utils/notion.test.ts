import { describe, expect, it, vi } from "vitest";
import { extractPageId, retryWithBackoff, $getPageFullContent } from "./notion";
import type { Client } from "@notionhq/client";

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
    const mockFn = vi.fn()
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockResolvedValue("success");

    vi.spyOn(global, 'setTimeout').mockImplementation((fn) => {
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

    vi.spyOn(global, 'setTimeout').mockImplementation((fn) => {
      fn();
      return {} as NodeJS.Timeout;
    });

    await expect(retryWithBackoff(mockFn, 2, 100)).rejects.toEqual({ code: "rate_limited" });
    expect(mockFn).toHaveBeenCalledTimes(2);

    vi.restoreAllMocks();
  });

  it("エクスポネンシャルバックオフの遅延を使用する", async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockRejectedValueOnce({ code: "rate_limited" })
      .mockResolvedValue("success");

    const setTimeoutSpy = vi.spyOn(global, 'setTimeout').mockImplementation((fn) => {
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
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      blocks: {
        children: {
          list: vi.fn(),
        },
      },
    } as unknown as Client;
  });

  it("子ブロックのないページコンテンツを取得できる", async () => {
    const mockBlocks = [
      {
        object: "block",
        id: "block-1",
        type: "paragraph",
        has_children: false,
        paragraph: { rich_text: [] },
      },
      {
        object: "block",
        id: "block-2",
        type: "heading_1",
        has_children: false,
        heading_1: { rich_text: [] },
      },
    ];

    mockClient.blocks.children.list.mockResolvedValue({
      results: mockBlocks,
      has_more: false,
      next_cursor: null,
    });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ ...mockBlocks[0], children: [] });
    expect(result[1]).toEqual({ ...mockBlocks[1], children: [] });
    expect(mockClient.blocks.children.list).toHaveBeenCalledWith({
      block_id: "page-id",
      start_cursor: undefined,
    });
  });

  it("ページネーション付きのコンテンツを取得できる", async () => {
    const mockBlocks1 = [
      {
        object: "block",
        id: "block-1",
        type: "paragraph",
        has_children: false,
        paragraph: { rich_text: [] },
      },
    ];

    const mockBlocks2 = [
      {
        object: "block",
        id: "block-2",
        type: "heading_1",
        has_children: false,
        heading_1: { rich_text: [] },
      },
    ];

    mockClient.blocks.children.list
      .mockResolvedValueOnce({
        results: mockBlocks1,
        has_more: true,
        next_cursor: "cursor-1",
      })
      .mockResolvedValueOnce({
        results: mockBlocks2,
        has_more: false,
        next_cursor: null,
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(2);
    expect(mockClient.blocks.children.list).toHaveBeenCalledTimes(2);
    expect(mockClient.blocks.children.list).toHaveBeenNthCalledWith(1, {
      block_id: "page-id",
      start_cursor: undefined,
    });
    expect(mockClient.blocks.children.list).toHaveBeenNthCalledWith(2, {
      block_id: "page-id",
      start_cursor: "cursor-1",
    });
  });

  it("子ブロックを持つブロックを再帰的に取得できる", async () => {
    const mockParentBlocks = [
      {
        object: "block",
        id: "parent-block",
        type: "callout",
        has_children: true,
        callout: { rich_text: [] },
      },
    ];

    const mockChildBlocks = [
      {
        object: "block",
        id: "child-block",
        type: "paragraph",
        has_children: false,
        paragraph: { rich_text: [] },
      },
    ];

    mockClient.blocks.children.list
      .mockResolvedValueOnce({
        results: mockParentBlocks,
        has_more: false,
        next_cursor: null,
      })
      .mockResolvedValueOnce({
        results: mockChildBlocks,
        has_more: false,
        next_cursor: null,
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(1);
    expect((result[0] as any).children).toHaveLength(1);
    expect((result[0] as any).children[0]).toEqual({ ...mockChildBlocks[0], children: [] });
    expect(mockClient.blocks.children.list).toHaveBeenCalledTimes(2);
  });

  it("ネストした子ブロックを深く再帰的に取得できる", async () => {
    const mockLevel1 = [
      {
        object: "block",
        id: "level-1-block",
        type: "toggle",
        has_children: true,
        toggle: { rich_text: [] },
      },
    ];

    const mockLevel2 = [
      {
        object: "block",
        id: "level-2-block",
        type: "bulleted_list_item",
        has_children: true,
        bulleted_list_item: { rich_text: [] },
      },
    ];

    const mockLevel3 = [
      {
        object: "block",
        id: "level-3-block",
        type: "paragraph",
        has_children: false,
        paragraph: { rich_text: [] },
      },
    ];

    mockClient.blocks.children.list
      .mockResolvedValueOnce({
        results: mockLevel1,
        has_more: false,
        next_cursor: null,
      })
      .mockResolvedValueOnce({
        results: mockLevel2,
        has_more: false,
        next_cursor: null,
      })
      .mockResolvedValueOnce({
        results: mockLevel3,
        has_more: false,
        next_cursor: null,
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(1);
    expect((result[0] as any).children).toHaveLength(1);
    expect((result[0] as any).children[0].children).toHaveLength(1);
    expect((result[0] as any).children[0].children[0]).toEqual({ ...mockLevel3[0], children: [] });
    expect(mockClient.blocks.children.list).toHaveBeenCalledTimes(3);
  });

  it("不完全なブロックに対してエラーを投げる", async () => {
    const incompleteBlock = {
      object: "block",
      id: "incomplete-block",
      // typeプロパティが欠けている不完全なブロック
    };

    mockClient.blocks.children.list.mockResolvedValue({
      results: [incompleteBlock],
      has_more: false,
      next_cursor: null,
    });

    await expect($getPageFullContent(mockClient, "page-id")).rejects.toThrow("Block is not full");
  });

  it("API呼び出しでエラーが発生した場合は伝播する", async () => {
    mockClient.blocks.children.list.mockRejectedValue(new Error("API Error"));

    await expect($getPageFullContent(mockClient, "page-id")).rejects.toThrow("API Error");
  });

  it("複数の子ブロックを並列で取得する", async () => {
    const mockParentBlocks = [
      {
        object: "block",
        id: "parent-1",
        type: "callout",
        has_children: true,
        callout: { rich_text: [] },
      },
      {
        object: "block",
        id: "parent-2",
        type: "toggle",
        has_children: true,
        toggle: { rich_text: [] },
      },
    ];

    const mockChild1 = [
      {
        object: "block",
        id: "child-1",
        type: "paragraph",
        has_children: false,
        paragraph: { rich_text: [] },
      },
    ];

    const mockChild2 = [
      {
        object: "block",
        id: "child-2",
        type: "paragraph",
        has_children: false,
        paragraph: { rich_text: [] },
      },
    ];

    mockClient.blocks.children.list
      .mockResolvedValueOnce({
        results: mockParentBlocks,
        has_more: false,
        next_cursor: null,
      })
      .mockResolvedValueOnce({
        results: mockChild1,
        has_more: false,
        next_cursor: null,
      })
      .mockResolvedValueOnce({
        results: mockChild2,
        has_more: false,
        next_cursor: null,
      });

    const result = await $getPageFullContent(mockClient, "page-id");

    expect(result).toHaveLength(2);
    expect((result[0] as any).children).toHaveLength(1);
    expect((result[1] as any).children).toHaveLength(1);
    expect((result[0] as any).children[0].id).toBe("child-1");
    expect((result[1] as any).children[0].id).toBe("child-2");
    expect(mockClient.blocks.children.list).toHaveBeenCalledTimes(3);
  });
});
