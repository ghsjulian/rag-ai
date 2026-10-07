import { config as loadEnv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.resolve(__dirname, "../../.env"), quiet: true });

const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "",
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5000"
};

export default config;