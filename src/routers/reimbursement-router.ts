import express from 'express'
import * as rService from "../services/reimbursement-service"
import { authorization } from "../middleware/auth-middleware"
import {loggingMiddleware} from "../middleware/logging-middleware"

export const reimbursementRouter = express.Router();

reimbursementRouter.get('/status/:statusId', authorization ([1]), loggingMiddleware, async (req, res) =>{
    let statusId = +req.params.statusId
    if(isNaN(statusId)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            let reimbursements = await rService.getReimbursementByStatusId(statusId)
            res.json(reimbursements)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/author/userId/:userId', authorization ([1], true), loggingMiddleware, async (req, res)=>{
    let userId = +req.params.userId
    if(isNaN(userId)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            let reimbursements = await rService.getReimbursementByUserId(userId)
            res.json(reimbursements)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.post('', authorization([1,2,3]), loggingMiddleware, async (req, res) => {
    const { body } = req;
        const post = {
            author: req.session.user.userId,
            amount: body.amount,
            description: body.description,
            type: body.type
        };
        for (const key in post) {
            if (!post[key]) {
                res.status(400).send('Please include all fields');
            }
}
         try {
             const newPost = await rService.postReimbursement(post);
             res.status(201).json(newPost);
         }
         catch (e) {
            res.status(e.status).send(e.message);
        }

    })

reimbursementRouter.patch('', authorization([1]), loggingMiddleware, async (req, res)=>{
    const { body } = req;
        const patch = {
            reimbursementId: body.reimbursementId,
            resolver: req.session.user.userId,
            status: body.status
        };
        for (const key in patch) {
            if (!patch[key]) {
                res.status(400).send('Please include a status and reimbursement Id');
            }
        }
        try {
            const newPost = await rService.patchReimbursement(patch);
            res.status(201).json(newPost);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
})