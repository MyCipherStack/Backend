//  entity should encapsulate important rules like email validation, password format rules, etc. You shouldn't create it just to wrap data — make it meaningful.



import { Types } from "mongoose";
import { UserPreferences } from "../../application/interfaces/ProfileInterfaces.js";

export class    User{
    constructor(
        public name:string,
        public email:string,
        public password:string,
        public status?:string,
        public _id?:Types.ObjectId,
        public image?:string,
        public googleId?:string,
        public refreshToken?:string,
        public displayName?: string,
        public theme?:string,
        public preferences?:UserPreferences
        
    ){}

    toDTO(){
        return {
            name:this.name,
            email:this.email,
            status:this.status,
            Image:this?.image

        }
    }

};