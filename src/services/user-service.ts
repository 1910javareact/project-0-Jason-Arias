import {User} from "../models/user"
import * as uDao from "../repositories/user-dao";

// call the daoGetUsers function from user-dao, no manipulation required for this request
export async function getAllUsers(): Promise<User[]> {
    try {
    return await uDao.daoGetAllUsers();
    }
    catch(e) {
        throw e
    }
}

// call the daoGetUserById function from user-dao, no manipulation required for this request
export async function getUserById(id: number): Promise <User> {
   try {
    return await uDao.daoGetUserById(id)
   }
   catch(e) {
       throw e
   }
    
}

// call the username and password check from the repository layer, no manipulation required for this request
export async function getUsernameAndPassword(username: string, password: string): Promise<User> {
    try {
    return await uDao.daoGetUsernameAndPassword(username, password)
    }
    catch(e) {
        throw e
    }
}

// update user from user Id, fianlly something to do in the service layer
export async function updateUser(req: User){
    try {
        const user = await uDao.daoGetUserById(req.userId);
        for (const key in req) {
            if (req[key] !== undefined && user.hasOwnProperty(key)) {
                user[key] = req[key];
            }
        }
        await uDao.daoUpdateUser(user);
        return user;
    } catch (e) {
        throw e;
    }
}