import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants/index.ts"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@layout": path.resolve(__dirname, "./src/layout/index.ts"),
      "@types": path.resolve(__dirname, "./src/types.d.ts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});