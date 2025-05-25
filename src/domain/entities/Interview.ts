



export class Interview{
    constructor(
        public position: string,
        public interviewType:string,
        public date:Date,
        public time:string,
        public duration: string,
        public notes:string,
        public hostId:string,
        public partipantId:string
    ){}
}