import * as esbuild from "esbuild";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import fs from "fs";

async function start() {
    const dist = path.join(__dirname, "dist");
    const src = path.join(__dirname, "src");

    // Ensure dist exists
    fs.mkdirSync(dist, { recursive: true });

    // Copy index.html on first run
    const indexSrc = path.join(src, "index.html");
    const indexDest = path.join(dist, "index.html");

    if (fs.existsSync(indexSrc)) {
        fs.copyFileSync(indexSrc, indexDest);
    }

    // ESBUILD WATCH
    const ctx = await esbuild.context({
        entryPoints: [path.join(src, "main.ts")],
        bundle: true,
        outfile: path.join(dist, "bundle.js"),
        sourcemap: true,
        target: ["es2020"],
        loader: { ".html": "text", ".scss": "text" }
    });

    await ctx.watch();

    // EXPRESS DEV SERVER
    const app = express();

    // 🔥 PROXY API → BACKEND (MUST COME FIRST)
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
            secure: false
        })
    );

    // STATIC FILES
    app.use(express.static(dist));

    // 🔥 SPA FALLBACK (Express 5 safe)
    app.use((req, res) => {
        res.sendFile(path.join(dist, "index.html"));
    });

    // RUN LOCAL DEV SERVER
    app.listen(4201, () => {
        console.log("Client dev server running at http://localhost:4201");
        console.log("Proxy ACTIVE: /api → http://localhost:3000");
    });
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});
