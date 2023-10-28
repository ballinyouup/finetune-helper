import Dexie from 'dexie';

export const db = new Dexie('Documents');

db.version(1).stores({
    documents: '++id, completions, name'
});

db.table('documents');
