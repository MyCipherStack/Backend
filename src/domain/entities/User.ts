//  entity should encapsulate important rules like email validation, password format rules, etc. You shouldn't create it just to wrap data — make it meaningful.



import { Types } from "mongoose";
import { UserPreferences } from "../../application/interfaces/ProfileInterfaces.js";

export class    User{


    constructor(
        public name:string,
        public email:string,
        public image?:string,
        public displayName?: string,
        public theme?:string,
        public bio?:String,
        public github?:String,
        public linkedin?:String,
        public created_at?:Date,
        public status?:string,
        public role?:string,    
        public streak?:{lastActiveDate:Date,currentStreak:number,higestStreak:number},
        public preferences?:UserPreferences,
        public refreshToken?:string,
        public _id?:Types.ObjectId,
        public googleId?:string,
        public password?:string,
        public updated_at?:Date,
        public subscriptionId?:string,
        public createdContest?:{count:string,date:Date},
    ){}
};