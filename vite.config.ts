import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // ✅ Ensures AWS Amplify finds the output
  },
  base: "/", // ✅ Ensures correct asset paths on AWSrm -rf node_modules package-lock.json dist
  server: {
    port: 3000,
    open: true,
  },
});

