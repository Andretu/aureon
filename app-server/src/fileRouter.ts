import fs from "fs";
import path from "path";
import { Express } from "express";

export function loadApiRoutes(app: Express) {
    // API compilate JS in dist/api
    const apiDir = path.join(__dirname, "api");

    if (!fs.existsSync(apiDir)) {
        console.error("API directory not found:", apiDir);
        return;
    }

    const files = fs.readdirSync(apiDir);

    for (const file of files) {
        if (!file.endsWith(".js")) continue;

        const routePath = `/api/${file.replace(".js", "")}`;
        const handler = require(path.join(apiDir, file));

        if (handler.GET) app.get(routePath, handler.GET);
        if (handler.POST) app.post(routePath, handler.POST);
        if (handler.PUT) app.put(routePath, handler.PUT);
        if (handler.DELETE) app.delete(routePath, handler.DELETE);

        console.log("Mounted API:", routePath);
    }
}
