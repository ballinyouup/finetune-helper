import type { Conversation } from "$lib/stores/output";

export function dataToCsv(data: { messages: Conversation[]; }): string {
    const csvRows: string[] = [];

    // Headers
    const headers: string[] = Object.keys(data.messages[0]);
    csvRows.push(headers.join(','));

    // Loop over the array of messages to create rows
    for (const message of data.messages) {
        const values = headers.map(header => message[header]);
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

export function downloadCsv(data: string, fileName: string = 'export.csv') {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export function downloadJSON(data: object, fileName: string = 'data.json') {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
