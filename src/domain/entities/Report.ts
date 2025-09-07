import { User } from "./User";

export class Report {
  constructor(
    public reportType: string,
    public description: string,
    public submittedBy: string,
    public pageInfo: string,
    public status: string,
    public reportedUser?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public reportedUserDetails?: User

  ) { }
}
