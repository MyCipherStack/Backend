
type typeInterviewDTO ={
    formData:{
    position:string,
    interviewType:string,
    date:string,
    time:string,
    duration:string,
    notes:string,
    isInvite:boolean
  },
  sessionType: 'invite',
  invitedUsers: [ 'dummy8' ]
}


export class InterviewDTO{
    position: string
    interviewType:string
    date:string
    time:string
    duration: string
    notes:string
    isInvite:boolean
    sessionType:string
    invitedUsers:string[]
    
    constructor(data:typeInterviewDTO){
        this.position=data.formData.position
        this.interviewType=data.formData.interviewType
        this.date=data.formData.date
        this.time=data.formData.time
        this.duration=data.formData.duration
        this.notes=data.formData.notes
        this.isInvite=data.formData.isInvite
        this.sessionType=data.sessionType
        this.invitedUsers=data.invitedUsers
    }
}