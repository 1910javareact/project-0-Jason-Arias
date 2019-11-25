import * as rDao from "../repositories/reimbursement-dao"
//import { Reimbursement } from "../models/reimbursement";

export function getReimbursementByStatusId(id:number){
    try{
        return rDao.daoReimbursementByStatusId(id)
    }
    catch(e){
        throw e
    }
}

export function getReimbursementByUserId(id:number){
    try{
        return rDao.daoGetReimbursementByUserId(id)
    }
    catch(e){
        throw e
    }
}

export function postReimbursement(post) {
    try {
        return rDao.daoPostReimbursement(post);
    } catch (e) {
        throw e;
    }

}

export async function patchReimbursement(patch) {
    try {
        const post = await rDao.daoGetReimbursementByReimbursementId(patch.reimbursementId);
        for (const key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key];
            }
        }
        return await rDao.daoUpdateReimbursement(post);
    } catch (e) {
        throw e;
    }

}