import {Request} from 'express'

export function loggingMiddleware(req:Request,res,next) {
   console.log(`request url:${req.url} and request method:${req.method} and request body:${JSON.stringify(req.body)}`);
   next();
   
}