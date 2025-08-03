export interface IGetRepositoryDataUseCase<T>{
    OneDocumentById(id:string):Promise< T| null>
    allDocuments():Promise<T[]|null>

}
