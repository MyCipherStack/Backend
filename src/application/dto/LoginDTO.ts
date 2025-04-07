


export class LoginDTO{
    identifier:string
    password:string
    
    constructor(data:{name:string;password:string}){
        this.identifier=data.name.trim(),
        this.password=data.password.trim()
    }
}