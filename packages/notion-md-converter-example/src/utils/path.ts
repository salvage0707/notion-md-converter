import * as fs from "node:fs";
import * as path from "node:path";

export const findPackageRoot = (): string => {
  let currentDir = __dirname;
  const maxDepth = 5;
  for (let i = 0; i < maxDepth; i++) {
    if (fs.existsSync(path.join(currentDir, "package.json"))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  throw new Error("package.json not found in parent directories");
};

export const findTmpDir = (nestedPath = ""): string => {
  const packageRoot = findPackageRoot();
  const tmpDir = path.join(packageRoot, "tmp", nestedPath);
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  return tmpDir;
};
