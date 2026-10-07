import z from "zod";
import { chunkText } from "../utils/rag.utils.js";
import { embed } from "../services/ai.service.js";
import { Chunk } from "../models/chunk.model.js";

interface Iresponse {
    success: boolean;
    message: string;
    filePath?: string;
}

const createDocumentSchema = z.object({
    name: z.string().trim().min(1).default("document"),
    text: z.string().trim().min(20, "text must be at least 20 characters long"),
});

const documentController = async (filePath: string, content: string): Promise<Iresponse> => {
    try {
        const parsed = createDocumentSchema.safeParse({ name: filePath, text: content });
        if (!parsed.success) {
            throw new Error(parsed.error.issues[0]?.message ?? "Wrong input");
        }
        const { name, text } = parsed.data;

        const chunks = chunkText(text);
        const vectors = await embed(chunks, "RETRIEVAL_DOCUMENT");

        await Chunk.insertMany(
            chunks.map((piece, i) => ({
                docName: name,
                text: piece,
                embedding: vectors[i]!,
            }))
        );

        return {
            success: true,
            message: "Document saved successfully",
            filePath
        }

    } catch (error) {
        console.error("Error in document controller : ", error);
        throw new Error("Failed to create document");
    }
};

export default documentController;