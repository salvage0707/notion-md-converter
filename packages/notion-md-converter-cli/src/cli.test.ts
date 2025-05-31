import { describe, expect, it, vi } from "vitest";

describe("CLI", () => {
  it("should have convert command", async () => {
    const { cli } = await import("./cli.js");

    const mockProcess = vi
      .spyOn(process, "argv", "get")
      .mockReturnValue(["node", "cli.js", "convert", "--help"]);

    const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });

    try {
      cli();
    } catch (error) {
      expect(error).toEqual(new Error("process.exit called"));
    }

    mockProcess.mockRestore();
    mockExit.mockRestore();
  });
});
