const SEPARATORS = ["\n\n", "\n", "। ", ". ", "? ", "! ", " "];

export function chunkText(text: string, size = 800, overlap = 150): string[] {
    const clean = text.replace(/\r\n/g, "\n").trim();
    if (!clean) return [];
    if (clean.length <= size) return [clean];

    const safeOverlap = Math.min(overlap, Math.floor(size / 2));
    const chunks: string[] = [];
    let start = 0;

    while (start < clean.length) {
        let end = Math.min(start + size, clean.length);

        if (end < clean.length) {
            end = findBreak(clean, start + Math.floor(size / 2), end);
        }

        const piece = clean.slice(start, end).trim();
        if (piece) chunks.push(piece);

        if (end >= clean.length) break;
        start = Math.max(end - safeOverlap, start + 1);
    }

    return chunks;
}

function findBreak(text: string, minEnd: number, end: number): number {
    const window = text.slice(minEnd, end);
    for (const sep of SEPARATORS) {
        const idx = window.lastIndexOf(sep);
        if (idx !== -1) return minEnd + idx + sep.length;
    }
    return end;
}

export function cosine(a: number[], b: number[]): number {
    const n = Math.min(a.length, b.length);
    let dot = 0;
    let na = 0;
    let nb = 0;
    for (let i = 0; i < n; i++) {
        dot += a[i]! * b[i]!;
        na += a[i]! * a[i]!;
        nb += b[i]! * b[i]!;
    }
    const denom = Math.sqrt(na) * Math.sqrt(nb);
    return denom === 0 ? 0 : dot / denom;
}

export function topK<T extends { embedding: number[] }>(
    query: number[],
    items: T[],
    k = 4
): (T & { score: number })[] {
    return items
        .map((item) => ({ ...item, score: cosine(query, item.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
}