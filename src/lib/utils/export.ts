import { type Completion, format } from "$lib/stores/documents";
import { get } from "svelte/store";
function dataToCsv(data: Completion[]): string {
    const csvRows: string[] = [];

    if (!data || data.length === 0 || !data[0] || !('messages' in data[0])) {
        return '';
    }

    if (get(format) === "OpenAI") {
        const rowTitles = ['system', 'user', 'assistant'] as const;
        csvRows.push(rowTitles.map(title => `"${title}"`).join(','));

        for (const group of data) {
            const row: { [key: string]: string; } = {};

            // Populate the row object
            for (const message of group.messages) {
                row[message.role] = `"${message.content}"`;
            }

            // Transform the row object to an array of messages based on rowTitles
            const values = rowTitles.map(title => row[title]);
            csvRows.push(values.join(','));
        }
    } else if (get(format) === "Llama") {
        const rowTitles = ['text'] as const;
        csvRows.push(rowTitles.map(title => `"${title}"`).join(','));

        for (const item of data) {
            const row: { text: string; } = {
                text: JSON.parse(serializeCompletionArray([item], false)).text.replace(/"/g, '""')
            };
            const values = rowTitles.map(title => `"${row[title]}"`);
            csvRows.push(values.join(','));
        }
    }

    return csvRows.join('\n');
}



type MimeTypes = 'text/plain' | "text/csv";

function downloadFile(data: string, fileName: string, mimeType: MimeTypes) {
    const blob = new Blob([data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


export function exportCSV(output: Completion[]) {
    downloadFile(
        dataToCsv(output),
        'data.csv',
        'text/csv'
    );
}

// Helper function to serialize the Completion array
export function serializeCompletionArray(output: Completion[], pretty = false): string {
    if (pretty) {
        if (get(format) === "OpenAI") {
            return output.map((obj) => JSON.stringify({ messages: obj.messages }, null, 2)).join('\n');
        } else {
            return output.map((obj) => {
                const formattedText = `<s>[INST] <<SYS>>${obj.messages[0].content}<<</SYS>>${obj.messages[1].content} [/INST] ${obj.messages[2].content}</s>`;
                return JSON.stringify({ text: formattedText }, null, 2);
            }).join('\n');

        }
    } else {
        if (get(format) === "OpenAI") {

            return output.map((obj) => JSON.stringify({ messages: obj.messages })).join('\n');
        } else {
            return output.map((obj) => {
                const formattedText = `<s>[INST] <<SYS>>${obj.messages[0].content}<<</SYS>>${obj.messages[1].content} [/INST] ${obj.messages[2].content}</s>`;
                return JSON.stringify({ text: formattedText });
            }).join('\n');
        }
    }
}
export function exportJSONL(output: Completion[]) {
    let data = serializeCompletionArray(output, false);
    downloadFile(data, 'data.jsonl', 'text/plain');
}




