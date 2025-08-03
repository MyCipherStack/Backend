interface IInput{

reportType: string
description: string
submittedBy: string
pageInfo: string
status: string
reportedUser?: string
}

export class CreateReportDTO {
  reportType: string;

  description: string;

  submittedBy: string;

  pageInfo: string;

  status: string;

  reportedUser?: string;

  constructor(data:IInput) {
    this.reportType = data.reportType,
    this.submittedBy = data.submittedBy,
    this.description = data.description,
    this.pageInfo = data.pageInfo,
    this.status = data.status,
    this.reportedUser = data.reportedUser;
  }
}
