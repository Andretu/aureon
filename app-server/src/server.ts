import express from "express";
import cors from "cors";
import { loadApiRoutes } from "./fileRouter";

const app = express();
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Aureon API Server' });
});

// API routes
loadApiRoutes(app);

const server = app.listen(3000, () => {
    console.log("✅ Aureon server listening http://localhost:3000");
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        process.exit(0);
    });
});