export function authorization(roleId: number[], userId?: boolean){
    return (req,res,next) => {
        let isAuth = false
        if (!req.session.user){
            res.status(401).send('Please Log in')
            return
        }
        for (const role of req.session.user.roles) {
        if (roleId.includes(role.roleId)) {
                isAuth = true
        }
    }
        if (userId) {
            const id = +req.params.id
            if (!isNaN(id)) {
                if (req.session.user.userId === id) {
                    isAuth = true
                }
            }
        }
    if(isAuth){
        next()
    } else {
        res.status(401).send('Token expired')
    }
}
}