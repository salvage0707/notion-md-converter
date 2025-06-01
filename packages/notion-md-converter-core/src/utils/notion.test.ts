import { describe, expect, it, vi } from "vitest";
import { extractPageId, retryWithBackoff } from "./notion";

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
