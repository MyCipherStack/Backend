import { Report } from "@/domain/entities/Report";
import { BaseRepository } from "./BaseRespositroy";
import { IReports, reportModel } from "../database/ReportModel";
import { Document } from "mongoose";
import { IReportRepository } from "@/domain/repositories/IReportRepository";
import { logger } from "@/logger";
import { User } from "@/domain/entities/User";



export class ReportRepository extends BaseRepository<Report, IReports> implements IReportRepository {

    constructor() {
        super(reportModel)
    }


    async getFiltersReports(filters: { page: number, limit: number, status?: string; search?: string; }): Promise<{
        reports: any[];
        totalReports: number;
        totalPages: number;
    }> {
        let query: any = {}

        if (filters.status) query.status = filters.status
        if (filters.search) {
            query.$or = [
                { description: { $regex: filters.search, $options: "i" } },
                { pageInfo: { $regex: filters.search, $options: "i" } },
            ]

        }
        const skip = (filters.page - 1) * filters.limit
        const totalReports = await reportModel.countDocuments(query);
        const totalPages = Math.ceil(totalReports / filters.limit);
        let users = await reportModel.find(query).populate("submittedBy").populate("reportedUser").skip(skip).limit(filters.limit).lean()
        let updatedUser = users.map(data => {

            return {
                id:data._id,
                reportType: data.reportType,
                description: data.description,
                submittedUser:data.submittedBy?.name,
                submittedId:data.submittedBy?._id,
                pageInfo: data.pageInfo,
                status: data.status,
                reportedUserId:data.reportedUser?._id,
                reportedUserDetails:  data?.reportedUser?.name,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                role:data.submittedBy?.role
            }

        })

        return { reports: updatedUser, totalReports, totalPages } 
    }






    protected toEntity(data: (IReports & Document<unknown, any, any>) | null): Report | null {
        if (!data) return null
        return new Report(
            data.reportType,
            data.description,
            data.submittedBy.toString(),
            data.pageInfo,
            data.status,
            data.reportedUser?.toString(),
            data.createdAt,
            data.updatedAt

        )
    }
}