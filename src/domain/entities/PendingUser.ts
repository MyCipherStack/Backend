
// here i extends User  
export class PendingUser {
    constructor(
        public name:string | null | undefined,
        public email:string,
        public password?:string| null,
        public createdAt?:Date,
        public otp?:string| null,
        public expireAt?:Date,
    ){
        // super(name,email,password)
    }
  
}   