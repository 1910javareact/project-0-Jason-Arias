import {User} from '../models/user'
import {UserDTO} from '../dto/user-dto'

export function userDTOtoUser(uD: UserDTO[]): User {
    const roles = [];
    for (const u of uD) {
        roles.push({roleId: u.role_id, role: u.role_name});
    }
    return new User (uD[0].userId, uD[0].username, uD[0].password, uD[0].firstName, uD[0].lastName, uD[0].email, roles);
}

export function multipleUserDTOtoUser(uD: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of uD) {
        if (currentUser.length === 0) {
            currentUser.push(u);
        } else if (currentUser[0].userId == u.userId) {
            currentUser.push(u);
        }
        else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(u);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}