import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      // CommonJS 포맷 (main: dist/index.js)
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      // ESM 포맷 (module: dist/index.esm.js)
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],

  // peerDependencies에 있는 'react'는 최종 번들에서 제외합니다.
  external: ["react"],
};
