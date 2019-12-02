import * as rDao from "../repositories/reimbursement-dao"
import { Reimbursement } from '../models/reimbursement';

export function getAllReimbursements(): Promise<Reimbursement[]> {
    return rDao.daoGetAllReimbursements();
}

export function getReimbursementByReimbursementId(reimbursementid){
    try {
        return rDao.daoGetReimbursementByReimbursementId(reimbursementid);
    } catch(e) {
        throw e;
    }
}

// call the daoGetReimbursementsByStatusId and return the data once it's collected
export function getReimbursementByStatusId(status:number){
    try{
        return rDao.daoReimbursementByStatusId(status)
    }
    catch(e){
        throw e
    }
}

// call the daoGetReimbursementsByUserId and return the data once it's collected
export function getReimbursementByUserId(userId:number){
    try{
        return rDao.daoGetReimbursementByUserId(userId)
    }
    catch(e){
        throw e
    }
}

// call the daoPostReimbersement and return the post
export function postReimbursement(post) {
    try {
        return rDao.daoPostReimbursement(post);
    } catch (e) {
        throw e;
    }

}

// call the daoPatchReimbersement and return the updated post
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