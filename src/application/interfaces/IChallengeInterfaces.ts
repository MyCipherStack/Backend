
export type IGroupChallenge = {
    hostId:string
    challengeName: string;
    participants:number
    duration:number
    problems:Record<string,string>[],
    type:string

  };



  export type IPairProgramming = {
    challengeName: string;
    problems:string[]
    duration:number
    problemsName: string[],
    sessionType: string,
    invitedUsers:string[]
    problemType:string

  };