import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "5175-i4w9vznjfghulg3cp25cx-f41ffc56.manus.computer",
      "5174-i4w9vznjfghulg3cp25cx-f41ffc56.manus.computer",
      "5173-i4w9vznjfghulg3cp25cx-f41ffc56.manus.computer",
      "localhost",
      "127.0.0.1"
    ]
  }
})

