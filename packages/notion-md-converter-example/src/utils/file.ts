import * as fs from "node:fs";
import * as path from "node:path";
import { findTmpDir } from "./path";

export const writeFile = (options: {
  dir?: string;
  filePath: string;
  content: string;
}) => {
  const { dir, filePath, content } = options;
  const tmpDir = findTmpDir(dir);
  const tmpPath = path.join(tmpDir, filePath);
  fs.writeFileSync(tmpPath, content, "utf-8");
};

export const writeJsonFile = (options: {
  dir?: string;
  filePath: string;
  jsonText: unknown;
}) => {
  const { dir, filePath, jsonText } = options;
  writeFile({ dir, filePath, content: JSON.stringify(jsonText, null, 2) });
};
