import * as esbuild from "esbuild";
import fs from "fs";
import path from "node:path";

const dist = path.join(__dirname, "dist");
const src = path.join(__dirname, "src");

fs.mkdirSync(dist, { recursive: true });

// Copia index.html nella build finale
fs.copyFileSync(path.join(src, "index.html"), path.join(dist, "index.html"));

esbuild.build({
    entryPoints: [path.join(__dirname, "src", "main.ts")],
    bundle: true,
    outfile: path.join(dist, "bundle.js"),
    loader: { ".html": "text", ".scss": "text" },
    minify: true,
    target: ["es2020"]
}).catch(() => process.exit(1));
