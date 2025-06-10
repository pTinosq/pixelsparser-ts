export interface Tag {
    type: string;
    entries: string[];
}

export interface Pixel {
    date: Date;
    type: string;
    scores: number[];
    score: number;
    mood: number;
    notes: string;
    tags: Tag[];
}

export interface PixelJSON {
    date: string;
    type: string;
    scores: number[];
    notes: string;
    tags: Tag[];
}
