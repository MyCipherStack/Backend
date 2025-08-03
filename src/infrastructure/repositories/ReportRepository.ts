import { Document } from 'mongoose';
import { Report } from '@/domain/entities/Report';
import { BaseRepository } from './BaseRepository';
import { IReports, reportModel } from '../database/ReportModel';
import { IReportRepository } from '@/domain/repositories/IReportRepository';

export class ReportRepository extends BaseRepository<Report, IReports> implements IReportRepository {
  constructor() {
    super(reportModel);
  }

  async getFiltersReports(filters: { page: number, limit: number, status?: string; search?: string; }): Promise<{
        reports: any[];
        totalReports: number;
        totalPages: number;
    }> {
    const query: any = {};

    if (filters.status) query.status = filters.status;
    if (filters.search) {
      query.$or = [
        { description: { $regex: filters.search, $options: 'i' } },
        { pageInfo: { $regex: filters.search, $options: 'i' } },
      ];
    }
    const skip = (filters.page - 1) * filters.limit;
    const totalReports = await reportModel.countDocuments(query);
    const totalPages = Math.ceil(totalReports / filters.limit);
    const users = await reportModel.find(query).populate('submittedBy').populate('reportedUser').skip(skip)
      .limit(filters.limit)
      .lean()
      .sort({ createdAt: -1 });
    const updatedUser = users.map((data) => ({
      id: data._id,
      reportType: data.reportType,
      description: data.description,
      submittedUser: data.submittedBy,
      submittedId: data.submittedBy?._id,
      pageInfo: data.pageInfo,
      status: data.status,
      reportedUserDetails: data?.reportedUser,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,

    }));

    return { reports: updatedUser, totalReports, totalPages };
  }

  protected toEntity(data: (IReports & Document<unknown>) | null): Report | null {
    if (!data) return null;
    return new Report(
      data.reportType,
      data.description,
      data.submittedBy.toString(),
      data.pageInfo,
      data.status,
      data.reportedUser?.toString(),
      data.createdAt,
      data.updatedAt,

    );
  }
}
