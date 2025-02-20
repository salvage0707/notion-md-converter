import {
  createBaseConfig,
  createConfig,
} from "@notion-md-converter/config/rollup";
import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };

const baseConfig = createBaseConfig(pkg);
const subpathConfigs = [
  createConfig(pkg, "src/types/index.ts", "dist/types/index.js"),
  createConfig(pkg, "src/test-helper/index.ts", "dist/test-helper/index.js"),
];

export default defineConfig([...baseConfig, ...subpathConfigs]);
