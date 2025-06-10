import * as fs from "fs/promises";
import * as path from "path";
import { load } from "../src";
import { Pixel } from "../src/types";

function mustParse(date: string): Date {
    const d = new Date(date);
    if (isNaN(d.getTime())) throw new Error(`Invalid date: ${date}`);
    return d;
}

test("Pixel creation manually", () => {
    const p: Pixel = {
        date: mustParse("2023-6-29"),
        type: "Mood",
        scores: [4],
        score: 4,
        mood: 4,
        notes: "Woke up and had breakfast, went to work, had a good day",
        tags: [{ type: "Emotions", entries: ["sad", "tired"] }]
    };

    expect(p.date.toISOString()).toBe(mustParse("2023-6-29").toISOString());
    expect(p.type).toBe("Mood");
    expect(p.score).toBe(4);
    expect(p.mood).toBe(4);
});

test("load parses test_diary.json correctly", async () => {
    const filePath = path.join("test", "test_data", "test_diary.json");
    const pixels = await load(filePath);

    expect(pixels.length).toBe(4);

    const p1 = pixels[0];
    expect(p1.date.toISOString()).toBe(mustParse("2022-9-20").toISOString());
    expect(p1.type).toBe("Mood");
    expect(p1.score).toBe(2);
    expect(p1.notes).toBe("I accidentally ate a whole bag of chips today. It slipped into my mouth. I swear!");
    expect(p1.tags).toEqual([
        { type: "Emotions", entries: ["joy", "sadness", "fear", "disgust"] }
    ]);

    const p2 = pixels[1];
    expect(p2.date.toISOString()).toBe(mustParse("2022-9-21").toISOString());
    expect(p2.type).toBe("Mood");
    expect(p2.score).toBe(3);
    expect(p2.tags).toEqual([{ type: "Emotions", entries: ["joy", "disgust"] }]);
});

test("load throws error on nonexistent file", async () => {
    await expect(load("test_data/nonexistent.json")).rejects.toThrow(/failed to read file/);
});

test("load throws error on invalid JSON", async () => {
    const filePath = path.join("test_data", "invalid.json");
    await fs.mkdir("test_data", { recursive: true });
    await fs.writeFile(filePath, `{this is not valid JSON}`);
    try {
        await expect(load(filePath)).rejects.toThrow(/failed to parse JSON/);
    } finally {
        await fs.rm(filePath);
    }
});

test("load throws error on bad date format", async () => {
    const filePath = path.join("test_data", "bad_date.json");
    await fs.mkdir("test_data", { recursive: true });
    await fs.writeFile(
        filePath,
        JSON.stringify([
            {
                date: "2022/09/20", // invalid format
                type: "Mood",
                scores: [2],
                notes: "bad date",
                tags: []
            }
        ])
    );
    try {
        await expect(load(filePath)).rejects.toThrow(/failed to parse date/);
    } finally {
        await fs.rm(filePath);
    }
});
