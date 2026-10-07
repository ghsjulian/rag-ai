import { readFileSync } from 'node:fs';
import { parseOffice, OfficeParserConfig } from 'officeparser';


export async function extractText(input: string | Buffer, filepath?: string): Promise<string> {
    try {
        const config: OfficeParserConfig = {
            newlineDelimiter: '\n',
            ignoreNotes: false,
        };

        // If passing a Buffer, pass the filepath/extension in config so officeparser knows the file type
        if (Buffer.isBuffer(input) && filepath) {
            const ext = filepath.split('.').pop()?.toLowerCase();
            if (ext) {
                (config as any).outputErrorLocation = ext; // Helps format identification in buffers
            }
        }

        // Execute parsing
        const result: any = await parseOffice(input, config);

        // 1. If result is already a plain string (older versions or simple text files)
        if (typeof result === 'string') {
            return result.trim();
        }

        // 2. officeparser v5+ AST Object: Extract and join ALL paragraph/content blocks
        if (result && Array.isArray(result.content)) {
            return result.content
                .map((block: any) => {
                    if (typeof block === 'string') return block;
                    if (block && typeof block.text === 'string') return block.text;
                    return '';
                })
                .filter((text: string) => text.trim().length > 0)
                .join('\n')
                .trim();
        }

        // 3. AST Helper Method fallback
        if (result && typeof result.to === 'function') {
            return result.to('text').trim();
        }

        return String(result || '').trim();

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to extract text: ${message}`);
    }
}