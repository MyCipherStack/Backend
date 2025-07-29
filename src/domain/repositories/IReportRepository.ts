import { BaseRepository } from "@/infrastructure/repositories/BaseRepository";
import { Report } from "../entities/Report";
import { IReports } from "@/infrastructure/database/ReportModel";



export interface IReportRepository extends BaseRepository<Report,IReports>{

    getFiltersReports(filters:{page:number,limit:number,status?: string, search?: string;
    }):Promise<{
      reports: any[];
      totalReports: number;
      totalPages: number;
    }>

}