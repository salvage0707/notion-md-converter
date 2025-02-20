import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

export function createConfig(pkg, input, output) {
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  return {
    input,
    output: [
      {
        file: output.replace(".js", ".cjs"),
        format: "cjs",
        sourcemap: true,
      },
      {
        file: output.replace(".js", ".mjs"),
        format: "es",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
      }),
      terser(),
    ],
  };
}

export function createBaseConfig(pkg) {
  return [createConfig(pkg, "src/index.ts", "dist/index.js")];
}
