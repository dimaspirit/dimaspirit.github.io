import { defineConfig } from 'vite'
import posthtml from 'posthtml'
import include from 'posthtml-include'

export default defineConfig({
  root: './src',
  base: "/",
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 1234,
    open: true,
  },
  plugins: [
    {
      name: 'vite-plugin-html-include',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return posthtml([
            include({ root: './src' })
          ]).process(html).then(result => result.html)
        }
      }
    }
  ]
})
