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

export function saveOneUser(u: User): Promise<User> {
    return uDao.daoSaveOneUser(u);
}

// call the daoGetUserById function from user-dao, no manipulation required for this request
export async function getUserById(userId: number): Promise <User> {
    console.log('Service: you are searching for user ' + userId);
    return await uDao.daoGetUserById(userId)
    
}

// call the username and password check from the repository layer, no manipulation required for this request
export async function getUsernameAndPassword(username: string, password: string): Promise<User> {
    return await uDao.daoGetUsernameAndPassword(username, password)
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