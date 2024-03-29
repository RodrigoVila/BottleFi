/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./assets"),
      "@artifacts": path.resolve(__dirname, "./artifacts"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants/index.ts"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@typechain-types": path.resolve(__dirname, "../typechain-types"),
      "@types": path.resolve(__dirname, "./src/types.d.ts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setupTest.ts"],
    coverage: {
      provider: "v8",
      reporter: ["html"],
      exclude: ["./src/utils/ethers.ts"]
    },
  },
});
