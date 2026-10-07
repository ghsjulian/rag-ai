import express, { NextFunction, Request, Response, type ErrorRequestHandler } from "express";
import { createServer } from "http";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/app.config.js";
import connectDB from "./config/db.config.js";
import initilizeSocket from "./socket/index.js";



const app = express();
const httpServer = createServer(app);
initilizeSocket(httpServer);
/* ---------- Middleware ---------- */
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));

/* ---------- Routes ---------- */
app.get("/", (_req: Request, res: Response) => {
    res.send("Express server is running...");
});

app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ ok: true });
});


/* ---------- 404 & Error handling ---------- */
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[!] Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
};
app.use(errorHandler);

/* ---------- Server ---------- */
const LINE = "-".repeat(56);

function printBanner(): void {
    console.log(LINE);
    console.log(`\n[+] Node ENV : ${config.NODE_ENV}`);
    console.log("\n[+] MongoDB  : Connected successfully");
    console.log(`\n[+] Server   : http://localhost:${config.PORT}\n`);
    console.log(LINE);
}

async function start(): Promise<void> {
    try {
        await connectDB();
        const server = httpServer.listen(config.PORT, printBanner);
        const shutdown = (signal: string): void => {
            console.log(`\n[*] ${signal} signal received. Shutting down gracefully...`);
            server.close(async () => {
                await mongoose.connection.close();
                process.exit(0);
            });
        };
        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
    } catch (error) {
        console.error("[!] Server could not be started:", error);
        process.exit(1);
    }
}

void start();

export default app;