

export interface IChangeRespoStatusUseCase<Entity>{
    execute(id:string,status:Partial<Entity>):Promise<Entity  |null>
}