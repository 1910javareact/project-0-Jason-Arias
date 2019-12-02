import express from 'express'
import {authorization} from "../middleware/auth-middleware"
import * as uService from '../services/user-service'
import { daoGetUserById } from '../repositories/user-dao'
import { User } from '../models/user';
import { saveOneUser } from '../services/user-service';
//import {loggingMiddleware} from '../middleware/logging-middleware'

//router base path
export const userRouter = express.Router()

//get users
async function controllerGetUsers(req, res){
   try {
       const user = await uService.getAllUsers()
       res.json(user);
   } catch(e) {
    res.status(e.status).send(e.message);
   }
}

userRouter.get('', [authorization(1), controllerGetUsers])

// getting a user by Id, accessable by finance managers, and the user with that id
userRouter.get('/:id', async (req,res) => {
    const userId = +req.params.id
    if(isNaN(userId)){
        res.sendStatus(400).send('Invalid ID detected')
    }else{
        try{
            const user = await daoGetUserById(userId)
            res.json(user)
            
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.post('', [authorization(1 || 2), async (req, res) => {
        const { body } = req;
        const newU = new User(0, '', '', '', '', '', 0);
        for (const key in newU) {
            if (body[key] === undefined) {
                res.status(400).send('Please include all user fields');
                break;
            } else {
                newU[key] = body[key];
            }
        }
        try {
            const user = await saveOneUser(newU);
            res.status(201).json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }]);

// update user info, only accessable by Admins
userRouter.patch('', [authorization(1), async (req, res) =>{
    try{
        let {body} = req
        let user = await uService.updateUser(body)
        res.status(200).json(user)
    }  
    catch(e){
        res.status(e.status).send(e.message)
    }
}]);