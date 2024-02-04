import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMath],
          rehypePlugins: [rehypeKatex],
      }),
    },
    react(),
  ],
});
