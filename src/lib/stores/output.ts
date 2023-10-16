export interface Completion {
    messages: {
        role: "system" | "user" | "assistant";
        content: string;
    }[];
    id: number;
}



