import path from "node:path"
import vue from "@vitejs/plugin-vue"
import frappeui from "frappe-ui/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    frappeui({
      buildConfig: false,
      frappeProxy: false,
      jinjaBootData: false,
      lucideIcons: true,
    }),
    vue(),
  ],
  optimizeDeps: {
    exclude: ["frappe-ui"],
    include: ["feather-icons", "debug"],
    needsInterop: ["feather-icons", "debug"],
  },
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@frappe-ui-components": path.resolve("node_modules/frappe-ui/src/components"),
    },
  },
})
