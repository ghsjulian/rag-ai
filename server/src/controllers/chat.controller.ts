import { Request, Response } from "express";
import z from "zod";
import { Chunk } from "../models/chunk.model.js";
import { topK } from "../utils/rag.utils.js";
import { getUpstreamStatus } from "../utils/http.utils.js";
import { embed, generateAnswer } from "../services/ai.service.js";

const TOP_K = 4;

const chatSchema = z.object({
    question: z
        .string()
        .trim()
        .min(2, "question must be at least 2 characters long")
        .max(1000, "question must be 1000 characters or fewer"),
    docName: z.string().trim().min(1).max(100).optional(),
});

const chatController = async (question: string, docName: string): Promise<String> => {
    try {
        // 2. Load chunks (only from the chosen document, if docName is given)
        const filter = docName ? { docName } : {};
        const chunks = await Chunk.find(filter).select("docName text embedding").lean();

        if (chunks.length === 0) {
            return "Document not found in server"
        }

        // 3. Embed the question and find the most similar chunks
        const [queryVector] = await embed([question], "RETRIEVAL_QUERY");
        if (!queryVector) {
            throw new Error("Failed to create an embedding for the question");
        }
        const best = topK(queryVector, chunks, TOP_K);

        // 4. Ask Claude using only those chunks
        const context = best.map((c, i) => `[${i + 1}] ${c.text}`).join("\n\n");
        const answer = await generateAnswer(context, question);
        return answer

    } catch (error) {
        console.error("Error in chat controller : ", error);

        if (getUpstreamStatus(error) === 429) {
            return "The AI service is busy right now. Please try again in a moment."
        }

        return "An unexpected error occurred while generating the answer.";
    }
};

export default chatController;