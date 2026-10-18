import path from "node:path";
import process from "node:process";
import baseConfig from "@mkvlrn/config/vite" with { type: "json" };
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { type UserConfig, defineConfig, loadEnv, mergeConfig } from "vite-plus";

export default defineConfig(({ mode }) => {
  const { PORT = "3000", GITHUB_ACTIONS } = loadEnv(mode, process.cwd(), "");

  let base = "/";
  if (GITHUB_ACTIONS) {
    base = "/template-vite-react/";
  }

  const appConfig: UserConfig = {
    base,
    build: {
      emptyOutDir: true,
      outDir: "./build",
      sourcemap: true,
      target: "esnext",
    },
    fmt: {
      ignorePatterns: ["src/generated/**"],
    },
    lint: {
      ignorePatterns: ["src/generated/**"],
      overrides: [
        {
          files: ["**/*.tsx"],
          rules: {
            "typescript/explicit-function-return-type": "off",
            "typescript/explicit-module-boundary-types": "off",
          },
        },
      ],
      rules: {
        "import/no-unassigned-import": [
          "error",
          { allow: ["**/*.css", "@testing-library/jest-dom/vitest"] },
        ],
      },
    },
    plugins: [
      tanstackRouter({
        autoCodeSplitting: true,
        generatedRouteTree: "./src/generated/router.gen.tsx",
        target: "react",
      }),
      react(),
    ],
    resolve: {
      alias: [{ find: /^#\//, replacement: `${path.resolve("src")}/` }],
    },
    server: {
      allowedHosts: true,
      port: Number(PORT),
    },
    test: {
      coverage: {
        exclude: [
          "**/*.{test,spec}.{ts,tsx}",
          "src/main.tsx",
          "src/{generated,routes,assets}",
          "**/*.{css,svg}",
        ],
      },
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
    },
  };

  return mergeConfig(baseConfig, appConfig);
});
