

export class GroupChallenge{
    constructor(
        public challengeName:string,
        public maxParticipants:number,
        public duration:number,
        public problems:string[],
        public type:string,
        public joinCode?:string,
        public startTime?:Date,
        public endTime?:Date,
        public status?:string,
        public _id?:string,
        public createdAt?:string,
        public updatedAt?:string,
        public hostId?:string
    ){}
}