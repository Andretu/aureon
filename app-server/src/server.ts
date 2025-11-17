import express from "express";
import cors from "cors";
import { loadApiRoutes } from "./fileRouter";

const app = express();
app.use(express.json());
app.use(cors());

// API only
loadApiRoutes(app);

// NO STATIC SERVE
// NO SPA FALLBACK

app.listen(3000, () => {
    console.log("Aureon server listening http://localhost:3000");
});
