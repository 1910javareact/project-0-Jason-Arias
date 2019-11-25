import {Pool} from 'pg';

export const connectionPool: Pool = new Pool({
    user: process.env[''],
    host: process.env[''],
    database: process.env[''],
    password: process.env[''],
    port: 5432,
    max: 5,
});
