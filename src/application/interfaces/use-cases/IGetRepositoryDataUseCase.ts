

export interface IGetRepositoryDataUseCase<T>{
    OneDocumentByid(id:string):Promise< T| null>
    allDoucuments():Promise<T[]|null>

}