
export class UpdateUserDTO{
    name?:string
    status?:string

    
    constructor(data:{name:string,status:string}){
        this.name=data.name
        this.status=data.status

    }
} 