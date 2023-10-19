import type { Completion, GPT, Llama } from "$lib/stores/output";

function dataToCsv(data: Completion[]): string {
    const csvRows: string[] = [];

    if ('messages' in data[0]) {
        const rowTitles = ['system', 'user', 'assistant'] as const;
        csvRows.push(rowTitles.map(title => `"${title}"`).join(','));

        for (const group of data) {
            const row: { [key: string]: string; } = {};

            // Populate the row object
            for (const message of (group as GPT).messages) {
                row[message.role] = `"${message.content}"`;
            }

            // Transform the row object to an array of messages based on rowTitles
            const values = rowTitles.map(title => row[title]);
            csvRows.push(values.join(','));
        }
    } else {
        // Handle Llama type here (assuming 'prompt' and 'completion' are properties)
        const rowTitles = ['prompt', 'completion'] as const;
        csvRows.push(rowTitles.map(title => `"${title}"`).join(','));

        for (const group of data) {
            const values = rowTitles.map(title => `"${(group as Llama)[title]}"`);
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
        return output.map((obj) => {
            if ('messages' in obj) {
                return JSON.stringify({ messages: obj.messages }, null, 2);
            } else {
                return JSON.stringify({ prompt: obj.prompt, completion: obj.completion }, null, 2);
            }
        }).join('\n');
    } else {
        return output.map((obj) => {
            if ('messages' in obj) {
                return JSON.stringify({ messages: obj.messages });
            } else {
                return JSON.stringify({ prompt: obj.prompt, completion: obj.completion });
            }
        }).join('\n');
    }
}
export function exportJSONL(output: Completion[]) {
    let data = serializeCompletionArray(output, false);
    downloadFile(data, 'data.jsonl', 'text/plain');
}




