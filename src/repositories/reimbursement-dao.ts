import { Reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from "../util/reimbursementDTO-to-reimbursement";

export async function daoGetAllReimbursements(): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement');
        return multiReimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

// get the reimbursements with a given status Id
export async function daoReimbursementByStatusId(status :number){
    let client: PoolClient

    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement NATURAL JOIN project_0.reimbursement_status NATURAL JOIN project_0.reimbursement_type WHERE status_id = $1 ORDER BY date_submitted DESC',
                                [status])
        if(result.rowCount === 0){
            throw `Reimbursement does not exist`
        }
        else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    }
    catch(e){
        if(e === `Reimbursement does not exist`){
            throw{
                status: 404,
                message: `Reimbursement does not exist`
            }
        }
        else{
            throw{
                status: 500,
                message: `Internal Server Error`
            }
        }
    }
    finally{
        client.release()
    }
}

// find reimbursements by user id and return the array
export async function daoGetReimbursementByUserId(userId:number){
    let client:PoolClient
    
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement NATURAL JOIN project_0.reimbursement_status NATURAL JOIN project_0.reimbursement_type WHERE author = $1 ORDER BY date_submitted DESC',
                                    [userId])
        if(result.rowCount === 0){
            throw `No Reimbursement Found`
        }
        else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    }
    catch(e){
        if(e === `No Reimbursement Found`){
            throw{
                status: 404,
                message: `No Reimbursement Found`
            }
        }
        else{
            throw{
                status: 500,
                message: `Something went wrong. Please try again`
            }
        }
    }
    finally{
        client.release()
    }
}

// make a new reimbursement request
export async function daoPostReimbursement(r){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        client.query(`BEGIN`)
        await client.query('INSERT INTO project_0.reimbursement (author, amount, date_submitted, description, resolver, status_id, type_id) values ($1,$2,$3,$4,1,$5)',
                            [r.author, r.amount, r.date_submitted, r.description, r.type])

        let result = await client.query('SELECT * FROM project_0.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
                                        [r.author])
        client.query('COMMIT')
        return reimbursementDTOtoReimbursement(result.rows)
    }
    catch(e){
        client.query('ROLLBACK')
        throw{
            status: 500,
            message: 'Internal Server Error'
        }
    }
    finally{
        client.release()
    }
}

// get a reimbersement by it's id
export async function daoGetReimbursementByReimbursementId(reimbursement_id:number){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement WHERE reimbursement_id = $1',
                                    [reimbursement_id])
        if(result.rowCount === 0){
            throw `Reimbursement not found`
        }
        else{
            return reimbursementDTOtoReimbursement(result.rows)
        }
    }
    catch(e){
        if(e === 'Reimbursement not found'){
            throw{
                status: 404,
                message: 'Reimbursement not found'
            }
        }
        else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }
    finally{
        client.release()
    }
}

// replace a reimbursemnt by it's id
export async function daoUpdateReimbursement(r: Reimbursement){
    let client:PoolClient
    
    try{
        client = await connectionPool.connect()
        client.query('BEGIN')
        await client.query(`UPDATE project0.reimbursement SET author = $2, amount = $3, datesubmitted = $4, dateresolved = $5, description = $6,
        resolver = $7, status = $8, type = $9 WHERE reimbursementid = $1;`,
        [r.reimbursementId, r.author, r.amount, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type]);
                                //return await daoGetReimbursementByReimbursementId(r.reimbursementId)
        client.query('COMMIT')                        
    }
    catch(e){
        client.query('ROLLBACK')
       // if(e === 'Reimbursement not found'){
           // throw{
               // status: 404,
               // message: 'Reimbursement not found'
           // }
        //}
        //else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    //}
    finally{
        client.release()
    }
}