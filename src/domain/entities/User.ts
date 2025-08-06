//  entity should encapsulate important rules like email validation, password format rules, etc. You shouldn't create it just to wrap data — make it meaningful.

import { Types } from 'mongoose';
import { UserPreferences } from '@/application/interfaces/ProfileInterfaces';

export class User {
  constructor(
        public name:string,
        public email:string,
        public image?:string,
        public displayName?: string,
        public theme?:string,
        public bio?:string,
        public github?:string,
        public linkedin?:string,
        public createdAt?:Date,
        public status?:string,
        public role?:string,
        public streak?:{lastActiveDate:Date, currentStreak:number, higestStreak:number},
        public preferences?:UserPreferences,
        public refreshToken?:string,
        public _id?:Types.ObjectId,
        public googleId?:string,
        public password?:string,
        public updatedAt?:Date,
        public subscriptionId?:string,
        public createdContest?:{count:string, date:Date},
  ) {}
}
