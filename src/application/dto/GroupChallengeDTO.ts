import { IGroupChallenge } from "../interfaces/IChallengeInterfaces";


export class GroupChallengeDTO{
        challengeName: string
        maxParticipants:number
        duration:number
        problems:string[]
        type:string

    constructor(data:IGroupChallenge){
        this.challengeName=data.challengeName
        this.maxParticipants=data.participants
        this.duration=data.duration
        this.problems=data.problems
        this.type=data.type
    }
}