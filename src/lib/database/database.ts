import Dexie from 'dexie';

export const db = new Dexie('Completions');

db.version(1).stores({
    completions: '++id'
});

db.table('completions');
