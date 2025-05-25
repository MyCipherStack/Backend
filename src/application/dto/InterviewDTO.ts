

export class InterviewDTO{
    position: string
    interviewType:string
    date:Date
    time:string
    duration: string
    notes:string

    constructor(data:InterviewDTO){
        this.position=data.position
        this.interviewType=data.interviewType
        this.date=data.date
        this.time=data.time
        this.duration=data.duration
        this.notes=data.notes
    }
}