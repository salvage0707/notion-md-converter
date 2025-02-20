import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";

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
        sourcemap: true,
      },
      {
        file: "dist/index.mjs",
        format: "es",
        sourcemap: true,
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
        tsconfig: "./tsconfig.json",
        exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
      }),
      terser(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          composite: false,
        },
      }),
    ],
  },
]);
