export interface ICreateRepoUseCase<T>{
    execute(data:Partial<T>):Promise<T|null>
}
