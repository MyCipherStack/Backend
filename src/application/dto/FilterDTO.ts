import e from "express";


export class FilterDTO{
    page:number;
    limit:number;
    role?:string;
    status:string;
    search?:string;

    constructor(data:{ page:number,limit:number,role?: string; status: string; search?: string }){
       
        this.role=data?.role
        this.status=data.status
        this.search=data.search
        this.page=data.page
        this.limit=data.limit
    }
}



