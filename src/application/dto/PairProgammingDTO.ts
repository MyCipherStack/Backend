import { IPairProgramming } from "../interfaces/IChallengeInterfaces.js";



export class PairProgramingDTO{
        challengeName: string
        problems:string[]
        type:string
        invitedFriends:string[]

    constructor(data:IPairProgramming){
        this.challengeName=data.challengeName
        this.problems=data.problems
        this.invitedFriends=data.invitedFriends
        this.type=data.type
    }

}