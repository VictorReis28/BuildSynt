import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [],
    include: ["react", "react-dom", "framer-motion", "lucide-react"],
  },
  build: {
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            return "vendor-other";
          }

          // Component chunks
          if (id.includes("components/")) {
            if (id.includes("UserSettings")) {
              return "chunk-settings";
            }
            if (id.includes("RepositoryAnalyzer")) {
              return "chunk-analyzer";
            }
          }
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: false, // Disable em produção para reduzir bundle
    // Optimize bundle size
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Target for better compatibility
    target: "esnext",
    // CSS code splitting
    cssCodeSplit: true,
  },
  server: {
    // Security headers for development
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
});
