


interface IPlan {
    name: string;
    price: number;
    cycle: string;
    features: string[];
    trial: number;
    status: string;
  }


export class PremiumPlanDTO{
    name: string;
    price: number;
    cycle: string;
    features: string[];
    trial: number;
    status: string;

    constructor(data:IPlan){
        this.name=data.name
        this.price=data.price
        this.features=data.features
        this.cycle=data.cycle
        this.trial=data.trial
        this.status=data.status
    }

}