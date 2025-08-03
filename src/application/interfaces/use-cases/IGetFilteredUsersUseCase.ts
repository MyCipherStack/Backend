import { User } from '../../../domain/entities/User.js';
import { FilterDTO } from '../../dto/FilterDTO.js';

export interface IGetFilteredUsersUseCase{
    execute(filters:FilterDTO):Promise<{ users:User[];
        totalUsers: number;
        totalPages: number;}>
}
