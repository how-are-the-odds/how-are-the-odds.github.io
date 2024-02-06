import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { KatexOptions } from "katex";

type Options = Omit<KatexOptions, "displayMode" | "throwOnError">;

// https://vitejs.dev/config/
export default defineConfig({
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
});
