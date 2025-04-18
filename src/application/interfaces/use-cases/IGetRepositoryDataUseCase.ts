

import { User } from "../../../domain/entities/User.js";
import { ProfileDTO } from "../../dto/ProfileDTO.js";


export interface IGetRepositoryDataUseCase<T>{
    execute(id:string):Promise< T| null>
}