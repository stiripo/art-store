import pgPromise from 'pg-promise';

const pgp = pgPromise();

export const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'art_store',
    user: 'postgres',
});
