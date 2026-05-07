import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = dirname(fileURLToPath(import.meta.url))

const sharedExtends = [
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
]

const browserGlobals = globals.browser

export default defineConfig([
  globalIgnores(["**/dist/**", "**/node_modules/**"]),
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    extends: sharedExtends,
    languageOptions: {
      ecmaVersion: 2020,
      globals: browserGlobals,
      parserOptions: {
        tsconfigRootDir: resolve(rootDir, "apps/web"),
      },
    },
  },
  {
    files: ["packages/ui/**/*.{ts,tsx}"],
    extends: sharedExtends,
    languageOptions: {
      ecmaVersion: 2020,
      globals: browserGlobals,
      parserOptions: {
        tsconfigRootDir: resolve(rootDir, "packages/ui"),
      },
    },
  },
])
