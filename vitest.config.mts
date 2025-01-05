import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // Need the server deps to mock next-auth in tests
    // https://github.com/nextauthjs/next-auth/issues/12280
    server: {
      deps: {
        inline: ["next-auth"],
      },
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./testSetup.ts",
    // css: true,
  },
});
