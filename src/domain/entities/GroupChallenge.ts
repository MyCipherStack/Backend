

export class GroupChallenge{
    constructor(
        public challengeName:string,
        public maxParticipants:number,
        public duration:number,
        public problems:string[],
        public type:string,
        public joinCode?:string,
        public startTime?:string,
        public endTime?:string,
        public status?:string,
        public _id?:string
    ){}
}