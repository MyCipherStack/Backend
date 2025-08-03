export class PairProgramingDTO {
  challengeName: string;

  problems: string[];

  sessionType: string;

  invitedUsers: string[];

  type: string;

  problemType: string;

  constructor(data: {
        type: string
        challengeName: string;
        problems: { id: string }[]
        invitedUsers: string[]
        problemType: string
        sessionType:string
    }) {
    this.challengeName = data.challengeName;
    this.problems = data.problems.map((data: { id: string }) => data.id);
    this.invitedUsers = data.invitedUsers;
    this.sessionType = data.sessionType;
    this.type = data.problemType;
    this.problemType = data.problemType;
  }
}
