import { defineConfig, loadEnv } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "import.meta.env.VITE_SPOONACULAR_API_KEY": JSON.stringify(
        env.VITE_SPOONACULAR_API_KEY,
      ),
      "import.meta.env.VITE_FDA_API_KEY": JSON.stringify(env.VITE_FDA_API_KEY),
    },
    plugins: [
      {
        enforce: "pre",
        ...mdx({
          rehypePlugins: [[rehypeKatex, { displayMode: true }]],
          remarkPlugins: [[remarkMath]],
        }),
      },
      react(),
    ],
  };
});
