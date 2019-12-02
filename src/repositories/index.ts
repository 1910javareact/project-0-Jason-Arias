import {Pool} from 'pg';

console.log({
    user: process.env['PROJECT0_USERNAME'],
    host: process.env['PROJECT0_HOST'],
    database: process.env['PROJECT0_DATABASE'],
    port: 5432,
    max: 5,
});

export const connectionPool: Pool = new Pool({

    //Data is confidential. Hide the data by assigning env. var
    user: process.env['PROJECT_0_USER'],
    host: process.env['PROJECT_0_HOST'],
    database: process.env['PROJECT_0_DATABASE'],
    password: process.env['PROJECT_0_PASSWORD'],
    port: 5432,
    max: 5,
});
