

export interface IChangeRespoStatusUseCase<T>{
    execute(id:string,status:string):Promise<T |null>
}