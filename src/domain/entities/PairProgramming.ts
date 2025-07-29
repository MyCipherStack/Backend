


export class PairProgramming{
    constructor(
        public hostId:string,
        public challengeName:string,
        public duration:number,
        public problems:string[],
        public type:string,
        public joinCode?:string,
        public startTime?:string,
        public endTime?:string,
        public _id?:string,
        public status?:string,
        public navigator?:{name:string,id:string},
        public createdAt?:string,
        public updatedAt?:string,
        public isBlocked?:string
        
    ){}
}