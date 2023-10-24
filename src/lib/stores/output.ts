import { writable } from "svelte/store";

export type GPT = {
    messages: {
        role: "system" | "user" | "assistant";
        content: string;
    }[];
    id: number;
};

export type Llama = {
    prompt: string;
    completion: string;
    id: number;
};

export type Completion = GPT | Llama;


export function isGPT(item: Completion): item is GPT {
    return typeof item === 'object' && 'messages' in item;
}

export function isLlama(item: Completion): item is Llama {
    return typeof item === 'object' && 'prompt' in item && 'completion' in item;
}

export let completions = writable<Completion[]>([])

export let checked = writable<boolean[]>([])