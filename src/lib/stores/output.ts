import { writable } from "svelte/store";

export type OpenAI = {
    messages: {
        role: "system" | "user" | "assistant";
        content: string;
    }[];
    id?: number;
};

export type Llama = {
    prompt: string;
    completion: string;
    id?: number;
};

export type Completion = OpenAI | Llama;

export type Document = {
    id?: number;
    completions: Completion[];
};


export function isOpenAI(item: Completion): item is OpenAI {
    return typeof item === 'object' && 'messages' in item;
}

export function isLlama(item: Completion): item is Llama {
    return typeof item === 'object' && 'prompt' in item && 'completion' in item;
}

export let documents = writable<Document>({ id: 0, completions: [] });
export let checked = writable<boolean[]>([]);