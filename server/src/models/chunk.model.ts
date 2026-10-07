import mongoose from "mongoose";

export interface IChunk {
    docName: string;
    text: string;
    embedding: number[];
}

const chunkSchema = new mongoose.Schema<IChunk>(
    {
        docName: { type: String, required: true, index: true },
        text: { type: String, required: true },
        embedding: { type: [Number], required: true },
    },
    { timestamps: true },
);

export const Chunk = mongoose.model<IChunk>("Chunk", chunkSchema);
