
export class UpdateUserDTO{
    name?:string
    status?:string

    
    constructor(data:Partial<UpdateUserDTO>){
        this.name=data.name
        this.status=data.status

    }
} 