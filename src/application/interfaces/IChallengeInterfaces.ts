
export type IGroupChallenge = {
    hostId:string
    challengeName: string;
    maxParticipants:number
    duration:number
    problems:string[],
    type:string

  };



  export type IPairProgramming = {
    challengeName: string;
    problems: string[],
    duration:number
    problemsName: string[],
    type: string,
    invitedFriends:string[]

  };