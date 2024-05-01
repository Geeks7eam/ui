import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  target: 'es2019',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
});

// import { Options, defineConfig } from "tsup"

// export default defineConfig((options: Options) => ({
//   entry: ["index.ts"],
//   banner: {
//     js: "'use client'",
//   },
//   format: ["cjs", "esm"],
//   dts: true,
//   clean: true,
//   external: ["react"],
//   injectStyle: true,
//   ...options,
// }))
