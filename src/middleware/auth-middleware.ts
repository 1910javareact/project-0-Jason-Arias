// using factory design pattern to make authorization easy to implement across the app
//export function authorization(roleId: number[], userId?: boolean){
  export function authorization(authRoles: number) {
    return (req,res,next) => {
        let isAuth = false
        if (!req.session.user){
            res.status(400).send('Please Log in')
            return
        }
        //check if role is authorized
        //for (const role of req.session.user.roles) {
        //if (roleId.includes(role.roleId)) {
            if (authRoles == req.session.user.role) {
                isAuth = true
        }
    //}
         //Check if userId matches what we are trying to access
        //if (userId) {
           // const id = +req.params.id
           // if (!isNaN(id)) {
               // if (req.session.user.userId === id) {
                  //  isAuth = true
               // }
           // }
       // }
    if(isAuth){
        next()
    } else {
        res.status(401).send('Unauthorized for access')
    }
}
}