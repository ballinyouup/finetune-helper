import { db } from "$lib/database/database";
import { writable, get } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';
import { goto } from "$app/navigation";

export type Completion = {
    messages: {
        role: "system" | "user" | "assistant";
        content: string;
    }[];
    id?: number;
};

export type Document = {
    id: string;
    name: string;
    completions: Completion[];
    createdAt: Date;
    format: "OpenAI" | "Llama";
};

export let document = writable<Document>({ id: uuidv4(), name: "Untitled", completions: [], createdAt: new Date(), format: "OpenAI" });
export let documents = writable<Document[]>([]);
export let checked = writable<boolean[]>([]);
export let edit = writable<boolean[]>([]);
export let documentLoading = writable<boolean>(false);
export let format = writable<"OpenAI" | "Llama">();
// const LOADING_TIME = 2000;

export async function getDocuments() {
    // documentLoading.set(true);
    const items = await db.table('documents').toArray() as Document[];
    items.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
            return b.createdAt.getTime() - a.createdAt.getTime();
        } else {
            return 0;
        }
    });
    documents.set(items.length > 0 ? items : []);
    edit.set(Array(get(documents).length).fill(false));
    // documentLoading.set(false);
    // setTimeout(() => {
    //     documentLoading.set(false);
    // }, LOADING_TIME);

}

export async function getStore(id: string) {
    // documentLoading.set(true);
    const item = await db.table('documents').get(id);
    document.set(item ? item : { id: uuidv4(), name: '', completions: [], createdAt: new Date(), format: "OpenAI" });
    format.set(get(document).format);
    // documentLoading.set(false);
    // setTimeout(() => {
    //     documentLoading.set(false);
    // }, LOADING_TIME);
}

export async function newDocument() {
    let uuid = uuidv4();
    await db.table('documents').add({ id: uuid, name: 'Untitled', completions: [], createdAt: new Date(), format: "OpenAI" });
    documents.set([{ id: uuid, name: 'Untitled', completions: [], createdAt: new Date(), format: "OpenAI" }, ...get(documents)]);
    edit.set(Array(get(documents).length).fill(false));
    await goto(`/${uuid}`);
}

export async function deleteDocument(id: string) {
    await db.table('documents').delete(id);
    documents.set(get(documents).filter((doc) => doc.id !== id));
    document.set({ id: uuidv4(), name: "Untitled", completions: [], createdAt: new Date(), format: "OpenAI" });
    edit.set(Array(get(documents).length).fill(false));
}

export async function editDocumentName(id: string, name: string) {
    await db.table('documents').update(id, {
        name: name
    });
    edit.set(Array(get(documents).length).fill(false));
}

export async function setFormat(fmt: "OpenAI" | "Llama", id: string) {
    await db.table('documents').update(id, {
        format: fmt
    });
    format.set(fmt);
}