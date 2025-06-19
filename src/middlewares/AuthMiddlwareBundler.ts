import { Authenticate } from "./Authenticate";




export class AuthMiddlwareBundler{
    constructor(
        private authenticate:any,
        private authorize:any,
        private role:string
    ){}

    verify=()=>{
        return [

        this.authenticate.verify,
        this.authorize.requireRole([this.role])
        ]
    }
  

}