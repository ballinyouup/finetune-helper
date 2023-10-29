import { db } from "$lib/database/database";
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
    id: number;
    name: string;
    completions: Completion[];
};


export function isOpenAI(item: Completion): item is OpenAI {
    return typeof item === 'object' && 'messages' in item;
}

export function isLlama(item: Completion): item is Llama {
    return typeof item === 'object' && 'prompt' in item && 'completion' in item;
}

export let document = writable<Document>({ id: 0, name: "Untitled", completions: [] });
export let documents = writable<Document[]>([]);
export let checked = writable<boolean[]>([]);
export let edit = writable<boolean[]>([]);


let docs: Document[];
documents.subscribe((doc) => {
    docs = doc;
});

export async function getDocuments() {
    documents.set(await db.table('documents').toArray());
    edit.set(Array(docs.length).fill(false));
}

export async function getStore(doc: number) {
    document.set(await db.table('documents').get(doc) || { id: 0, name: 'Untitled', completions: [] });
}

export async function newDocument() {
    await db.table('documents').add({ id: docs.length, name: 'Untitled', completions: [] });
    documents.set([...docs, { id: docs.length, name: 'Untitled', completions: [] }]);
}

export async function deleteDocument(id: number) {
    await db.table('documents').delete(id);
    documents.set(docs.filter((doc) => doc.id !== id));
    document.set({ id: 0, name: "Untitled", completions: [] });
}

export async function editDocumentName(id: number, name: string) {
    await db.table('documents').update(id, {
        name: name
    });
    edit.set(Array(docs.length).fill(false));
}