import { readFileSync } from "node:fs";
import { extractText } from "../utils/extract-text.js";
import documentController from "./document.controller.js";


const handleFileController = async (filePath: string) => {
    try {
        let content: string = "";
        // Check if the file is a text file based on its extension
        const textFileExtensions = ['txt', 'md', 'csv', 'log'];
        const ext = filePath?.split('.').pop()?.toLowerCase();
        if (ext && textFileExtensions.includes(ext)) {
            content = readFileSync(filePath as string, 'utf-8');
        } else {
            content = await extractText(filePath as string);
        }
        await documentController(filePath, content);
    } catch (error) {
        throw new Error("Failed to handle file");
    }

}

export default handleFileController;