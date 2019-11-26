import express from 'express'
import {authorization} from "../middleware/auth-middleware"
import * as uService from '../services/user-service'
import { daoGetUserById } from '../repositories/user-dao'
//import {loggingMiddleware} from '../middleware/logging-middleware'

//router base path
export const userRouter = express.Router()

//get users
async function controllerGetUsers(req, res){
   try {
       const users = await uService.getAllUsers()
       res.json(users);
   } catch(e) {
    res.status(e.status).send(e.message);
   }
}

userRouter.get('', [authorization([1]), controllerGetUsers])

// getting a user by Id, accessable by finance managers, and the user with that id
userRouter.get('/:id', async (req,res) => {
    const id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400).send('Invalid ID detected')
    }else{
        try{
            const user = await daoGetUserById(id)
            res.json(user)
            
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

// update user info, only accessable by Admins
userRouter.patch('', authorization([2]), async (req, res) =>{
    try{
        let {body} = req
        let user = await uService.updateUser(body)
        res.status(200).json(user)
    }  
    catch(e){
        res.status(e.status).send(e.message)
    }
})