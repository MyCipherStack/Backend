


import { Report } from "@/domain/entities/Report";



export class ReportMapper {

    static toResponseDTO(report:Report) {

        return {
             reportType:report.reportType ,
             description:report.description ,
             submittedUser:report.submittedBy ,
             pageInfo:report.pageInfo ,
             status:report.status ,
             reportedUser:report.reportedUser ,
             createdAt: report.createdAt,
             updatedAt: report.updatedAt,
             reportedUserDetails:report?.reportedUserDetails

        }
    }
}




