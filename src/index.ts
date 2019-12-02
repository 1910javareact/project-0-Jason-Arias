import express from 'express'
import bodyParser from 'body-parser'
import {loggingMiddleware} from './middleware/logging-middleware'
import {sessionMiddleware} from './middleware/session-middleware'
import { getUsernameAndPassword } from './services/user-service'
import { userRouter } from './routers/user-router'
import { reimbursementRouter } from './routers/reimbursement-router'

//Create instance of express
const app = express()

//Json string to Js Object
app.use(bodyParser.json())

//logging in middleware
app.use(loggingMiddleware)

//Add a session object to a req object. Access using req.session
app.use(sessionMiddleware)

//Endpoints

//Find users
//Update users
app.use('/login', async (req, res) => {
    const {username, password} = req.body

    if(!username || !password) {
        res.status(400).send(`Invalid Credentials`)
    }

    try{
        const user = await getUsernameAndPassword(username, password)
        req.session.user = user
        res.json(user)
    }
    catch(e){
        res.status(e.status).send(e.message)
    }
})

//Retreives users from the database
app.use('/users', userRouter)

//Find user by id

//submit reimbursements
app.use('/reimbursements', reimbursementRouter)

app.listen(1003, () => {
    console.log('app has started');
    
})