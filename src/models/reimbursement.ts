

export class Reimbursement {
    reimbursementId: number //primary key
    author: number //not null
    amount: number //not null
    dateSubmitted: number //not null
    dateResolved: number //not null
    description: string //not null
    resolver: number // foreign key -> user
    status: number //foreign key -> reimbursement-status, not null
    type: number //foreign jey -> reimbursement-type
    constructor(reimbursementId:number,author:number,amount:number,dateSubmitted:number,dateResolved:number,description:string,resolver:number,status:number,type:number) {
        this.reimbursementId = reimbursementId
        this.author = author
        this.amount = amount
        this.dateSubmitted = dateSubmitted
        this.dateResolved = dateResolved
        this.description = description
        this.resolver = resolver
        this.status = status
        this.type = type
    }
}

export class ReimbursementStatus {
    statusId: number //primary key
    status: string
    constructor(statusId:number,status:string) {
        this.statusId = statusId
        this.status = status
    }
}

export class ReimbursementType {
    typeId: number
    type: string
    constructor(typeId:number,type:string) {
        this.typeId = typeId
        this.type = type
    }
}