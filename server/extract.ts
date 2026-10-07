import { parseOfficeAsync } from 'officeparser';
import path from 'node:path';

/**
 * Extracts raw text from any document format (.pdf, .docx, .pptx, .xlsx, .odt, .txt, etc.)
 * @param {string|Buffer} input - File path or File Buffer
 * @returns {Promise<string>} Extracted raw text
 */
export async function extractText(input) {
    try {
        // officeparser handles PDF, DOCX, PPTX, XLSX, ODT, ODS, ODP, TXT, XML, etc.
        const text = await parseOfficeAsync(input, {
            newlineDelimiter: '\n', // Clean line endings
            ignoreNotes: false,     // Include slide notes/comments if applicable
        });

        return text.trim();
    } catch (error) {
        throw new Error(`Failed to extract text: ${error.message}`);
    }
}

// Quick Execution Example:
(async () => {
    const sampleFile = './document.docx'; // Try with .pdf, .docx, .xlsx, .pptx, .txt

    try {
        const extractedText = await extractText(sampleFile);
        console.log('--- Extracted Output ---');
        console.log(extractedText);
    } catch (err) {
        console.error(err.message);
    }
})();