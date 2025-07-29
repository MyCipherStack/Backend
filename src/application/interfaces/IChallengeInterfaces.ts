
export type IGroupChallenge = {
  hostId: string
  challengeName: string;
  participants: number
  duration: number
  problems: { id: string }[],
  type: string,
  maxParticipants: number,


};



export type IPairProgramming = {
  hostId: string
  type: string
  challengeName: string;
  problems: string[]
  duration: number
  problemsName: string[],
  sessionType: string,
  invitedUsers: string[]
  problemType: string

};