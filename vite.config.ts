import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";
// import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        relativeUrls: true,
        modifyVars: {
          "@primary-color": "#3c3f57",
          "@font-family": "'Inter', sans-serif",
          "@border-radius-base": "0.382rem",
          "@modal-header-border-width": 0,
          "@modal-footer-border-width": 0,
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@ant-design/icons"],
  },
  server: {
    fs: {
      allow: ["."],
    },
  },
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    nodePolyfills(),

    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: true,
    //   },
    // }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@ant-design/pro-form")) {
            return "pro-form";
          }
        },
      },
    },
  },
});
function VitePWA(arg0: {
  registerType: string;
  devOptions: { enabled: boolean };
}): import("vite").PluginOption {
  throw new Error("Function not implemented.");
}
