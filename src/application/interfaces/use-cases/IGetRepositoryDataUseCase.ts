

export interface IGetRepositoryDataUseCase<T>{
    execute(id:string):Promise< T| null>
}