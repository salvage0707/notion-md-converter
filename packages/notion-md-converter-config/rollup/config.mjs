import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

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
    ],
  };
}

export function createDtsConfig(input, output) {
  return {
    input,
    output: [{ file: output, format: "es" }],
    plugins: [
      dts({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          composite: false,
          baseUrl: ".",
          include: ["src/**/*.ts"],
          exclude: ["node_modules", "dist"],
        },
      }),
    ],
  };
}

export function createBaseConfig(pkg) {
  return [
    createConfig(pkg, "src/index.ts", "dist/index.js"),
    createDtsConfig("src/index.ts", "dist/index.d.ts"),
  ];
}
