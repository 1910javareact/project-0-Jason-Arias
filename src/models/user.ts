
//Keeps track of user information
export class User{
userId: number //primary key
username: string //not null, unique
password: string //not null
firstName: string //not null
lastName: string //not null
email: string //not null
role: number //not null
constructor(userId:number, username:string, password: string, firstName:string, lastName:string,email:string,role:number){
    this.userId = userId,
    this.username = username,
    this.password = password,
    this.firstName = firstName,
    this.lastName = lastName,
    this.email = email,
    this.role = role
}
}

//Keeps track of permissions a user hass
//export class Role {
    //roleId: number //primary key
    //role: string //not null, unique
    //constructor(roleId: number, role:string) {
       // this.roleId = roleId
        //this.role = role
    //}
//}