import express from 'express'
import * as rService from "../services/reimbursement-service"
import { authorization } from "../middleware/auth-middleware"
//import {loggingMiddleware} from "../middleware/logging-middleware"
import {Reimbursement} from "../models/reimbursement"

export const reimbursementRouter = express.Router();

reimbursementRouter.get('', authorization(1), 
    async (req, res) => {
    const reimbursement = await rService.getAllReimbursements();
    if (reimbursement) {
        res.json(reimbursement);
    } else {
        res.sendStatus(500);
    }
});

// finding reimbursements by status
reimbursementRouter.get('/:reimbursementId', authorization (1), async (req, res) =>{
    const reimbursementId = await +req.params.reimbursementId
    if(isNaN(reimbursementId)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            const reimbursements = await rService.getReimbursementByReimbursementId(reimbursementId)
            res.json(reimbursements)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

// get reimbursements by userId
reimbursementRouter.get('/author/:userId/', authorization (1), async (req, res)=>{
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

reimbursementRouter.get('/status/:status', authorization(1),
    async (req, res) => {
        const status = await +req.params.status;
        // console.log(status);
        if (isNaN(status)) {
            res.status(400).send('Invalid status');
        } else {
            try {
                const reimbursements = await rService.getReimbursementByStatusId(status);
                res.json(reimbursements);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });

// submit a riembursement, date submitted will be handled in the database
// amount description and type are all that are required
reimbursementRouter.post('', //authorization(1 || 2 || 3), 
async (req, res) => {
    const{body} = req;
    const reimbursement = new Reimbursement(0, 0, 0, 0, 0, ``, 0, 0, 0);
    for (const key in reimbursement) {
        if (body[key] === undefined) {
            res.status(400).send(`Please include all required fields`);
            break;
        } else {
            reimbursement[key] = body[key];
        }

    }
    try {
    const result = await rService.postReimbursement(reimbursement);
    if (result != undefined) {
        res.status(201).json('created');
    }
     } catch (e) {
    res.status(e.status).send(e.message);
}
});
    //const { body } = req;
        //const post = {
           // author: req.session.user.userId,
           // amount: body.amount,
           // description: body.description,
           // type: body.type
        //};
        //for (const key in post) {
           // if (!post[key]) {
               // res.status(400).send('Please include all fields');
           // }
//}
         //try {
            // const newPost = await rService.postReimbursement(post);
            // res.status(201).json(newPost);
        // }
        // catch (e) {
            //res.status(e.status).send(e.message);
        //}

//})
    
// update a reimbursement
// only admins are allowed to update a request, and only approve or deny them
// only a status and reimbursementId is required
reimbursementRouter.patch('', //authorization(1), 
async (req, res)=>{
        const { body } = req;
        const reimbursement = new Reimbursement(0, 0, 0, 0, 0, '', 0, 0, 0);
        for (const key in reimbursement) {
            reimbursement[key] = body[key];
        }
    const id = reimbursement.reimbursementId;
    if(isNaN(id)) {
        res.status(400).send('Enter valid reimbursement Id')
    }
    try {
        const result = await rService.patchReimbursement(reimbursement);
        res.status(201).json(result);

    }
    catch(e){
        res.status(e.status).send(e.message);
    }
    })    
       // reimbursement.reimbursementId = body.reimbursementId;
        //reimbursement.status = body.status;
        //const update = await rService.patchReimbursement(reimbursement);
        //res.status(200).json(update);

    //const { body } = req;
       // const patch = {
           // reimbursementId: body.reimbursementId,
            //resolver: req.session.user.userId,
            //status: body.status
        //};
        //for (const key in patch) {
            //if (!patch[key]) {
                //res.status(400).send('Please include a status and reimbursement Id');
            //}
        //}
        //try {
           // const newPost = await rService.patchReimbursement(patch);
           // res.status(201).json(newPost);
        //} catch (e) {
           // res.status(e.status).send(e.message);
        //}
//})