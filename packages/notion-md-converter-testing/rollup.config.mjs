import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json" assert { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
      },
      {
        file: "dist/index.mjs",
        format: "es",
      },
    ],
    external,
    plugins: [
      json({
        compact: true,
      }),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
      }),
      terser(),
      visualizer(),
    ],
  },
]);
