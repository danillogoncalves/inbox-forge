import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
    },
    globals: false,
    include: ["packages/**/*.test.ts", "apps/**/*.test.ts"],
  },
});
