// import { IBaseRepository } from "../../domain/repositories/IBaseRespository.js";
// import { IChangeRespoStatusUseCase } from "../interfaces/use-cases/IChangeRespoStatusUseCase.js";



// export class ChangeRespoStatusUseCase<T extends {status:string}> implements IChangeRespoStatusUseCase<T>{
//     constructor(
//         private repository:IBaseRepository<T>

//     ){}
 

//    async execute(id: string, status: string): Promise<T | null> {
//     const data=await   this.repository.findOneAndUpdate(id,{status:status} as Partial<T>)
//     if(data){
//         return data
//     }
//     return null
//      }
// }