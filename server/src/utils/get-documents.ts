import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from "node:url";

const ALLOWED_EXTENSIONS = new Set([
    '.pdf',
    '.txt',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.csv',
    '.ppt',
    '.pptx', ".md", ".log", ".db"
]);



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getDocumentFiles = async (dirPath: string): Promise<string[]> => {
    let documentFiles: string[] = [];

    try {
        const entries = await fs.readdir(path.join(__dirname, dirPath), { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(__dirname, dirPath, entry.name);

            if (entry.isDirectory()) {
                const subFolderFiles = await getDocumentFiles(fullPath);
                documentFiles = documentFiles.concat(subFolderFiles);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (ALLOWED_EXTENSIONS.has(ext)) {
                    documentFiles.push(fullPath);
                }
            }
        }
    } catch (error) {
        console.error(`Error reading directory at ${dirPath}:`, error);
        throw error;
    }
    return documentFiles.reverse();
};

export default getDocumentFiles;