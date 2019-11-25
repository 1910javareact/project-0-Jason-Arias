import {User} from "../models/user"
import {PoolClient} from 'pg'
import {connectionPool} from '.'
import {userDTOtoUser, multipleUserDTOtoUser} from '../util/userDTO-to-user'


export async function daoGetAllUsers(): Promise<User[]> {
    let client : PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role');
        if(result.rowCount === 0){
            throw 'No Users Exist'
        }
        else{
            return multipleUserDTOtoUser(result.rows)
        }
    }
    catch(e){
        //console.log(e);
        if (e == 'No Users Exist') {
            throw {
                status: 400,
                message: 'No Users Exist'
            }
        }
        else {       
        throw {
            status: 500,
            message: 'Internal Server Error'
        };  
    }  
    }
    finally {
        client.release();
    }
}

export async function daoGetUserById (id: number): Promise<User> {
    let client : PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role WHERE user_id = $1',
                                     [id])
        if (result.rowCount === 0) {
            throw 'No user exists'
        } 
        else {
            return userDTOtoUser(result.rows)
        }
    } 
    catch(e) {
        if (e === 'No user exists') {
            throw {
                status: 404,
                message: 'No user found'
            };
        }
        else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }
    finally {
        client.release()
    }
}

export async function daoGetUsernameAndPassword(username: string, password: string): Promise<User> {
    let client : PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role WHERE username = $1 and password = $2',
                                [username, password]);
        if (result.rowCount === 0) {
            throw 'Bad credentials';
        } 
        else {
            return userDTOtoUser(result.rows);
        }
    }
    catch(e) {
        console.log(e);
        if (e == 'Bad credentials') {
            throw {
            status: 401,
            message: 'Invalid credentials'
        };
        }
        else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }
    finally {
        client && client.release();
    }
}

export async function daoUpdateUser(user: User){
    
    let client: PoolClient
    client = await connectionPool.connect()
  
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('update project_0.user set username = $1, password = $2, first_name = $3, last_name = $4, email = $5 where user_id = $6',
            [user.username, user.password, user.firstName, user.lastName, user.email, user.userId]);
        await client.query('delete from project_0.user_role where user_id = $1',
            [user.userId]);
        for ( const role of user.roles) {
            await client.query('insert into project_0.user_role values ($1,$2)',
            [user.userId, role.roleId]);
        }
        client.query('COMMIT');
    } catch (e) {
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.release();
    }
}
