import { Report } from "@/domain/entities/Report";



export interface IGetAllReportsUsecase{
    execute(data:{ page?:number,limit?:number, status?: string; search?: string }):Promise<{
        reports: any[];
        totalReports: number;
        totalPages: number;
    }| null >
}