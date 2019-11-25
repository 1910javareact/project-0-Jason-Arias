import {User} from "./models/user"
import { Reimbursement } from "./models/reimbursement"
import {Role} from "./models/user"
import {ReimbursementStatus} from "./models/reimbursement"
import {ReimbursementType} from "./models/reimbursement"


//database to hold user and role
export let roles = [
    new Role (1, "trainee"),
    new Role (2, "employee"),
    new Role (3, "quality Control"),
    new Role (4, "admin")
]

export let users = [
    new User(101,"Default","pass","John","Smith", "redacted@redacted.gov", []), 
    new User(102,"Official","password","Joe","Gomez", "Joeg@hotmail.com", []), 
    new User(103,"Testmaster","Enterqc","Steve","Min", "qc@company.com", []), 
    new User(104,"Boss","Letmein","Sir","Bossman", "bosstime@company.com",[]) 
]

export let reimbursementStatus = [
    new ReimbursementStatus(1, "Pending"),
    new ReimbursementStatus(2, "Approved"),
    new ReimbursementStatus(3, "Denied")
]

export let reimbursementType = [
    new ReimbursementType(1, "Lodging"),
    new ReimbursementType(2, "Travel"),
    new ReimbursementType(3, "Food"),
    new ReimbursementType(4, "Other")
]
export let reimbursements = [
  new Reimbursement(1001, 0, 19.99, 11012019, 11022019, "Gas for car", 2, 2, 2),
  new Reimbursement(1002, 0, 350.00, 11032019, 11042019, "Hotel room", 4, 1, 1),
  new Reimbursement(1003, 0, 15.50, 11102019, 11112019, "Breakfast", 3, 3, 3)
]


