import fs from "fs/promises";
import { Pixel, PixelJSON } from "./types";

/**
 * Parses a PixelJSON object into a fully typed Pixel object
 */
function parsePixel(pj: PixelJSON): Pixel {
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(pj.date)) {
        throw new Error(`failed to parse date '${pj.date}'`);
    }
    const parsedDate = new Date(pj.date);

    if (!pj.scores || pj.scores.length === 0) {
        throw new Error("scores array is empty or undefined");
    }

    return {
        date: parsedDate,
        type: pj.type,
        scores: pj.scores,
        score: pj.scores[0],
        mood: pj.scores[0],
        notes: pj.notes,
        tags: pj.tags,
    };
}

/**
 * Loads and parses Pixel data from a JSON file
 */
export async function load(path: string): Promise<Pixel[]> {
    let data: Buffer;
    try {
        data = await fs.readFile(path);
    } catch (err: any) {
        throw new Error(`failed to read file ${path}: ${err.message}`);
    }

    let pixelsJSON: PixelJSON[];
    try {
        pixelsJSON = JSON.parse(data.toString());
    } catch (err: any) {
        throw new Error(`failed to parse JSON: ${err.message}`);
    }

    return pixelsJSON.map(parsePixel);
}

// noop: release trigger 