import { describe, expect, it } from "vitest";
import { extractPageId } from "./notion.js";

describe("extractPageId", () => {
  it("should extract page ID from Notion URL", () => {
    const url = "https://www.notion.so/Test-Page-12345678901234567890123456789012";
    const result = extractPageId(url);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("should extract page ID from Notion URL with UUID format", () => {
    const url = "https://www.notion.so/Test-Page-12345678-9012-3456-7890-123456789012";
    const result = extractPageId(url);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("should return clean page ID when given clean ID", () => {
    const id = "12345678901234567890123456789012";
    const result = extractPageId(id);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("should clean page ID with hyphens", () => {
    const id = "12345678-9012-3456-7890-123456789012";
    const result = extractPageId(id);
    expect(result).toBe("12345678901234567890123456789012");
  });

  it("should throw error for invalid URL", () => {
    const invalidUrl = "https://www.notion.so/invalid-url";
    expect(() => extractPageId(invalidUrl)).toThrow("Invalid Notion page URL format");
  });

  it("should throw error for invalid page ID", () => {
    const invalidId = "invalid-id";
    expect(() => extractPageId(invalidId)).toThrow("Invalid page ID format");
  });
});
