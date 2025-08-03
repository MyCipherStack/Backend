export class PremiumPlan {
  constructor(
        public name:string,
        public price:number,
        public cycle:string,
        public features:{text:string, enabled:boolean}[],
        public trial:number,
        public status:string,
        public _id?:string,
  ) {}
}
