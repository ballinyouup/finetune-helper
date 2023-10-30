import { db } from "$lib/database/database";
import { writable } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';
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
    id: string;
    name: string;
    completions: Completion[];
    createdAt: Date;
};


export function isOpenAI(item: Completion): item is OpenAI {
    return typeof item === 'object' && 'messages' in item;
}

export function isLlama(item: Completion): item is Llama {
    return typeof item === 'object' && 'prompt' in item && 'completion' in item;
}

export let document = writable<Document>({ id: uuidv4(), name: "Untitled", completions: [], createdAt: new Date() });
export let documents = writable<Document[]>([]);
export let checked = writable<boolean[]>([]);
export let edit = writable<boolean[]>([]);

let docs: Document[];
documents.subscribe((doc) => {
    docs = doc;
});

export async function getDocuments() {
    const items = await db.table('documents').toArray() as Document[];
    const sortedItems = items.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
    });
    console.log(sortedItems);
    documents.set(items.length > 0 ? sortedItems : []);
    edit.set(Array(docs.length).fill(false));
}

export async function getStore(id: string) {
    const item = await db.table('documents').get(id);
    document.set(item ? item : { id: uuidv4(), name: '', completions: [], createdAt: new Date() });
}

export async function newDocument() {
    let uuid = uuidv4();
    await db.table('documents').add({ id: uuid, name: 'Untitled', completions: [] });
    documents.set([...docs, { id: uuid, name: 'Untitled', completions: [], createdAt: new Date() }]);
}

export async function deleteDocument(id: string) {
    await db.table('documents').delete(id);
    documents.set(docs.filter((doc) => doc.id !== id));
    document.set({ id: uuidv4(), name: "Untitled", completions: [], createdAt: new Date() });
}

export async function editDocumentName(id: string, name: string) {
    await db.table('documents').update(id, {
        name: name
    });
    edit.set(Array(docs.length).fill(false));
}