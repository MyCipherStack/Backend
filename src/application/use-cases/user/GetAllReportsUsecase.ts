import { IGetAllReportsUsecase } from '@/application/interfaces/use-cases/IReportUseCase';
import { ReportMapper } from '@/application/mapper/ReportMapper';
import { IReportRepository } from '@/domain/repositories/IReportRepository';

export class GetAllReportsUsecase implements IGetAllReportsUsecase {
  constructor(
    private reportRepository: IReportRepository,
  ) { }

  async execute(data: { page: number, limit: number, status: string; search: string }): Promise<{
    reports: any[];
    totalReports: number;
    totalPages: number;
  } | null> {
    const reportData = await this.reportRepository.getFiltersReports(data);

    return {
      reports: reportData.reports.map(data => ReportMapper.toResponseDTO(data)),
      totalReports: reportData.totalPages,
      totalPages: reportData.totalReports,
    }

    return reportData ?? null;
  }
}
