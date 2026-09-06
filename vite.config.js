import { defineConfig } from "vite";

const inlineCssAndStripComments = () => ({
  name: "inline-css-strip-comments",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler(html, ctx) {
      let next = html;
      const bundle = ctx.bundle;
      if (bundle) {
        let css = "";
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type === "asset" && fileName.endsWith(".css")) {
            css += String(chunk.source);
            delete bundle[fileName];
          }
        }
        if (css) {
          next = next.replace(
            /<link rel="stylesheet"[^>]*href="[^"]+\.css"[^>]*>/,
            `<style>${css}</style>`,
          );
        }
      }
      return next.replace(/<!--[\s\S]*?-->/g, "");
    },
  },
});

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [inlineCssAndStripComments()],
});
