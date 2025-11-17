import { Request, Response } from "express";

export function POST(req: Request, res: Response) {
    res.json({
        status: "ok",
        received: req.body
    });
}
