import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// === Load API files (ESM + Windows support) ===
const apiDir = path.join(__dirname, "api");
if (fs.existsSync(apiDir)) {
    const files = fs.readdirSync(apiDir);

    for (const file of files) {
        if (file.endsWith(".js")) {
            const routePath = path.join(apiDir, file);

            // IMPORTANTISSIMO SU WINDOWS:
            const module = await import(pathToFileURL(routePath).href);

            const route = module.default;
            const routeName = "/api/" + file.replace(".js", "");

            app.get(routeName, async (req, res) => {
                try {
                    const output = await route(req, res);
                    res.json(output);
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: String(error) });
                }
            });
        }
    }
}

// === Load server pages (SSR-like ESM) ===
const routesDir = path.join(__dirname, "routes");
if (fs.existsSync(routesDir)) {
    const files = fs.readdirSync(routesDir);

    for (const file of files) {
        if (file.endsWith(".js")) {
            const routePath = path.join(routesDir, file);

            const module = await import(pathToFileURL(routePath).href);

            const routeName = "/" + file.replace(".js", "");

            app.get(routeName, (req, res) => {
                try {
                    const html = module.render();
                    res.send(html);
                } catch (error) {
                    console.error(error);
                    res.status(500).send(String(error));
                }
            });
        }
    }
}

app.get("/", (req, res) => {
    res.send("<h2>Aureon Backend — OK ✔</h2><p>Try /api/hello</p>");
});

app.listen(PORT, () => {
    console.log(`🔥 Aureon Backend running at: http://localhost:${PORT}`);
});
