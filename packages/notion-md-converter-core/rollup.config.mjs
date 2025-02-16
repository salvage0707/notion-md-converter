import {
  createBaseConfig,
  createConfig,
  createDtsConfig,
} from "@notion-md-converter/config/rollup";
import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };

const baseConfig = createBaseConfig(pkg);
const subpathConfigs = [
  createConfig(pkg, "src/types/index.ts", "dist/types/index.js"),
  createConfig(pkg, "src/test-helper/index.ts", "dist/test-helper/index.js"),
  createDtsConfig("src/index.ts", "dist/index.d.ts"),
  createDtsConfig("src/types/index.ts", "dist/types/index.d.ts"),
  createDtsConfig("src/test-helper/index.ts", "dist/test-helper/index.d.ts"),
];

export default defineConfig([...baseConfig, ...subpathConfigs]);
