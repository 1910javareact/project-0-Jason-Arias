import {User} from "../models/user"
import {PoolClient} from 'pg'
import {connectionPool} from '.'
import {userDTOtoUser, multipleUserDTOtoUser} from '../util/userDTO-to-user'

//get all users from the database. Then return them.
export async function daoGetAllUsers(): Promise<User[]> {
    let client : PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role');
        //if(result.rowCount === 0){
            //throw 'No Users Exist'
            return multipleUserDTOtoUser(result.rows)
        }
       // else{
            //return multipleUserDTOtoUser(result.rows)
       // }
   // }
    catch(e){
        console.log(e);
        
        //if (e == 'No Users Exist') {
            //throw {
               // status: 400,
               // message: 'No Users Exist'
           // }
       // }
       // else {       
        throw {
            status: 500,
            message: 'Internal Server Error'
        //};  
    }  
    }
    finally {
        client && client.release();
    }
}

export async function daoSaveOneUser(u: User): Promise<User> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('INSERT INTO project0.user (username, "password", firstname, lastname, email, "role") values ($1,$2,$3,$4,$5,$6) RETURNING userid',
        [u.username, u.password, u.firstName, u.lastName, u.email, u.role]);
        await client.query('COMMIT');
        return userDTOtoUser(result.rows);
    } catch (e) {
        await client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

//get user from database based on the id
export async function daoGetUserById (userId: number): Promise<User> {
    let client : PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role WHERE user_id = $1',
                                     [userId])
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows)
           // throw 'No user exists'
        } 
        else {
            //return userDTOtoUser(result.rows)
            throw 'No user exists'
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
        client && client.release()
    }
}

//see whether the entered username and password matches input with login. If so, return user
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

// update a user in the database
export async function daoUpdateUser(newUser: User){
    
    let client: PoolClient
    client = await connectionPool.connect()
  
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('update project_0.user set username = $1, password = $2, first_name = $3, last_name = $4, email = $5 where user_id = $6',
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.userId]);
        //await client.query('delete from project_0.user_role where user_id = $1',
           // [newUser.userId]);
        //for ( const role of newUser.roles) {
           // await client.query('insert into project_0.user_role values ($1,$2)',
           // [newUser.userId, role.roleId]);
        //}
        client.query('COMMIT');
    } catch (e) {
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}
