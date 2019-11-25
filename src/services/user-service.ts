import {User} from "../models/user"
import * as uDao from "../repositories/user-dao";

export function getAllUsers() {
    try {
    return uDao.daoGetAllUsers()
    }
    catch(e) {
        throw e
    }
}

export function getUserById(id: number) {
   try {
    return uDao.daoGetUserById(id)
   }
   catch(e) {
       throw e
   }
    
}

export function getUsernameAndPassword(username: string, password: string): Promise<User> {
    try {
    return uDao.daoGetUsernameAndPassword(username, password)
    }
    catch(e) {
        throw e
    }
}

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