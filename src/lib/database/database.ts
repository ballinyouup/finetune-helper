import Dexie from 'dexie';

export const db = new Dexie('Documents');

db.version(1.4).stores({
    documents: '++id, completions, name, format, createdAt',
});

db.table('documents');
