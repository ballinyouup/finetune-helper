import { writable, type Writable } from "svelte/store";
export interface Conversation {
    system: string;
    user: string;
    assistant: string;
}
// Where we store the json output
export const output: Writable<Conversation[]> = writable([]);