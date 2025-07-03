import { IPairProgramming } from "../interfaces/IChallengeInterfaces.js";



export class PairProgramingDTO{
        challengeName: string
        problems:string[]
        type:string
        invitedUsers:string[]
        problemType:string

    constructor(data:IPairProgramming){
        this.challengeName=data.challengeName
        this.problems=data.problems.map((data:{id:string})=>data.id)
        this.invitedUsers=data.invitedUsers
        this.type=data.sessionType
        this.problemType=data.problemType
        
    }

}