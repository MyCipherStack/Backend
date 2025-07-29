import { FilterDTO } from "@/application/dto/FilterDTO";
import { Transaction } from "@/domain/entities/Transaction";




export interface IAdminDashBoardUseCase {

    execute(range: string): Promise<{
        userData: {
            range: string;
            usersCount: number;
        }[], totalUsers: number, premiumUsers: number, transactions: {
            range: string;
            revenue: string;
        }[], thisMonthRevenu: number
    } | null>

}


export interface ILoginAdminUsecase {
    execute(name: string, password: string): Promise<{ admin: { name: string }, refreshToken: string, accessToken: string }>
}
export interface ITransactionUseCase {
    execute(filters: FilterDTO): Promise<{
        transaction: Transaction[];
        totalTransaction: number;
        totalPages: number;
    }>

}

