import { Request, Response } from "express";

export function GET(req: Request, res: Response) {
    res.json({ message: "Hello" });
}
