interface Features {text:String,enabled:Boolean}



export class CreateSubscripctionDTO{
    
        userId:string

        transactionId:string

        name:string

        price:number

        cycle:string

        features:Features[]

        trial:number

        status:string

        planId:string

    constructor(data){  
        console.log("plan details",data);
        
       this.userId=data.userId
       this.transactionId=data.transactionId
       this.name=data.name
       this.price=data.price
       this.cycle=data.cycle
       this.features=data.features as Features[]
       this.trial=data.trial
       this.status=data.status
       this.planId=data._id
    }
}