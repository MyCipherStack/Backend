



export class ResetPasswordDTO{
    currentPassword:string
    password:string
    email:string
    
    constructor(data:{current:string;password:string},email:string){
        this.currentPassword=data.current
        this.password=data.password
        this.email=email
    }
}