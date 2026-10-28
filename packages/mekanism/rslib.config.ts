import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      bundle: false,
      dts: true,
      format: "esm",
      output: {
        distPath: { root: "dist" },
        filename: { js: "[name].js" },
      },
    },
  ],
  output: {
    target: "web",
  },
  plugins: [pluginReact()],
  source: {
    entry: {
      index: [
        "./src/**",
        "!./src/**/*.test.ts",
        "!./src/**/*.test.tsx",
        "!./src/vitest.setup.ts",
      ],
    },
  },
});
