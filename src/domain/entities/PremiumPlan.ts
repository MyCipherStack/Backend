

export class PremiumPlan{
    constructor(
        public name:string,
        public price:number,
        public cycle:number,
        public features:string[],
        public trial:string,
        public status:string,
        public _id?:string,
    ){}
}