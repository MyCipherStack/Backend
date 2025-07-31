import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { IGroupChallenge } from "../interfaces/IChallengeInterfaces";


export class GroupChallengeDTO {
    challengeName: string
    maxParticipants: number
    duration: number
    problems: string[]
    type: string

    constructor(data: {
        challengeName: string;
        participants: number
        duration: number
        problems: { id: string, name: string }[],
        type: string,
        maxParticipants: number,
    }) {

        this.challengeName = data.challengeName
        this.maxParticipants = data.participants
        this.duration = data.duration
        this.problems = data.problems.map((data) => data.id)
        this.type = data.type
    }
}