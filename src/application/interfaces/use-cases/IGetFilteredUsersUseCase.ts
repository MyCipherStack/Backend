
import { FilterDTO } from '@/application/dto/FilterDTO';
import { User } from '@/domain/entities/User';


export interface IGetFilteredUsersUseCase{
    execute(filters:FilterDTO):Promise<{ users:User[];
        totalUsers: number;
        totalPages: number;}>
}
