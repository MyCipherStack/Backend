

export class PremiumPlan{
    constructor(
        public name:string,
        public price:number,
        public cycle:string,
        public features:{text:String,enabled:Boolean}[],
        public trial:number,
        public status:string,
        public _id?:string,
    ){}
}