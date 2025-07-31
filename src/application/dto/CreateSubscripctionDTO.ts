interface Features { text: string, enabled: Boolean }



export class CreateSubscripctionDTO {

    userId: string

    transactionId: string

    name: string


    price: number

    cycle: string

    features: Features[]

    trial: number

    status: string

    planId: string

    constructor(data: {
        userId: string
        transactionId: string
        name: string
        price: number
        cycle: string
        features: Features[]
        trial: number
        status: string
        _id: string

    }) {

        this.userId = data.userId
        this.transactionId = data.transactionId
        this.name = data.name
        this.price = data.price
        this.cycle = data.cycle
        this.features = data.features as Features[]
        this.trial = data.trial
        this.status = data.status
        this.planId = data._id
    }
}