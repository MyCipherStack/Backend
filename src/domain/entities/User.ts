//  entity should encapsulate important rules like email validation, password format rules, etc. You shouldn't create it just to wrap data — make it meaningful.



import { Types } from "mongoose";

export class User{
    constructor(
        public name:string,
        public email:string,
        public password:string,
        public status?:string,
        public _id?:Types.ObjectId,
        public image?:string,
        public googleId?:string,
        public refreshToken?:string,
    ){}

    toDTO(){
        return {
            name:this.name,
            email:this.email,
            status:this.status
        }
    }

}