import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("test"),
  },
  test: {
    testTimeout: 20_000,
    coverage: {
      exclude: [
        "src/**/*.test.*",
        "src/**/demo.tsx",
        "src/**/types.ts",
        "src/css/**",
      ],
      include: ["src/**/*.tsx", "src/**/*.ts"],
      provider: "v8",
      thresholds: {
        branches: 60,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/vitest.setup.ts"],
  },
});
