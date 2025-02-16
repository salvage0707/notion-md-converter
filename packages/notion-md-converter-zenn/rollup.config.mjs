import { createBaseConfig } from "@notion-md-converter/config/rollup";
import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };

export default defineConfig(createBaseConfig(pkg));
