import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// cartella pages nella root del progetto
const pagesDir = resolve(__dirname, "pages");

// leggi tutti i file .html nella root/pages
const pageFiles = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith(".html"))
  .reduce((obj, f) => {
    const name = f.replace(".html", "");
    obj[name] = resolve(pagesDir, f);
    return obj;
  }, {});

export default defineConfig({
  base: '/Empty_Project/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...pageFiles // ora legge la cartella pages nella root
      }
    }
  }
});
