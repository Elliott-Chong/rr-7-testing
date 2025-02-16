import { reactRouter } from "@react-router/dev/vite";
import { barrel } from 'vite-plugin-barrel'
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 3000, strictPort: true },
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    barrel({ packages: ['lucide-react'] }),
  ],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
});
