import type { Completion } from "$lib/stores/output";

function dataToCsv(data: Completion[]): string {
    const csvRows: string[] = [];
    const rowTitles = ['system', 'user', 'assistant'] as const;
    csvRows.push(rowTitles.join(','));

    for (const group of data) {
        const row: { [key: string]: string; } = {};

        // Populate the row object
        for (const message of group.messages) {
            row[message.role] = message.content;
        }

        // Transform the row object to an array of messages based on rowTitles
        const values = rowTitles.map((title) => row[title]);

        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}


type MimeTypes = "application/json" | "text/csv";

function downloadFile(data: string | object, fileName: string, mimeType: MimeTypes) {
    let processedData: string;

    if (mimeType === "application/json") {
        processedData = JSON.stringify(data);
    } else if (typeof data === "string") {
        processedData = data;
    } else {
        throw new Error("Invalid data format");
    }

    const blob = new Blob([processedData], { type: mimeType });
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
export function serializeCompletionArray(output: Completion[], pretty: boolean = false): string {
    return output.map(obj => {
        if (!pretty) {
            return JSON.stringify({ messages: obj.messages });
        } else {
            return JSON.stringify({ messages: obj.messages }, null, 2);
        }
    }).join("\n");
}

// Updated exportJSON function
export function exportJSON(output: Completion[]) {
    downloadFile(JSON.parse(serializeCompletionArray(output)), 'data.json', 'application/json');
}


