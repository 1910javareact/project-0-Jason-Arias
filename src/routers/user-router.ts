import express from 'express'
import {authorization} from "../middleware/auth-middleware"
import * as uService from '../services/user-service'
import {loggingMiddleware} from '../middleware/logging-middleware'


export const userRouter = express.Router()

//get users
//async function controllerGetUsers(req, res){
   // let users = uService.getAllUsers()
   // if (users) {
   //     res.json(users)
   // }
    //else {
       // res.sendStatus(500)
    //}
//}

userRouter.get('', authorization([1]), loggingMiddleware, async (req, res) => {
    try {
        const user = await uService.getAllUsers()
        res.json(user)
    }
    catch(e) {
        res.status(e.status).send(e.message)
    }
})

userRouter.get('/:userId', authorization([1], true), async (req,res) => {
    const id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400).send('Invalid ID detected')
    }else{
        try{
            const user = await uService.getUserById(id)
            res.json(user)
            
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('', authorization([2]), loggingMiddleware, async (req, res) =>{
    try{
        let {body} = req
        let user = await uService.updateUser(body)
        res.status(200).json(user)
    }  
    catch(e){
        res.status(e.status).send(e.message)
    }
})