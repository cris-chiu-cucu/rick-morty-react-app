import { defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: "./vitest.browser.setup.ts",
    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [
        { browser: "chromium" },
        // todo: uncomment next lines of code after fixing issues with tests
        // { browser: "firefox" },
        // { browser: "webkit" },
      ],
    },
  },
})
