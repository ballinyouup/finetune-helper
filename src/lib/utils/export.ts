import type { Conversation } from "$lib/stores/output";

function dataToCsv(data: { messages: Conversation[]; }): string {
    const csvRows: string[] = [];
    const rowTitles = ['system', 'user', 'assistant'] as const;
    csvRows.push(rowTitles.join(','));

    for (const message of data.messages) {
        const values = rowTitles.map(header => message[header]);
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

export function exportCSV(output: Conversation[]) {
    downloadFile(
        dataToCsv({
            messages: output
        }),
        'data.csv',
        'text/csv'
    );
}

export function exportJSON(output: Conversation[]) {
    downloadFile(
        {
            messages: output
        },
        'data.json',
        'application/json'
    );
}
