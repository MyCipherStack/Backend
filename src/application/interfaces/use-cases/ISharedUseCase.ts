

export interface IChangeRespoStatusUseCase<Entity>{

    execute(id:string,status:Partial<Entity>):Promise<Entity  |null>

}



export interface IUpdateRepositoryDataUseCase<Entity>{

    execute(id:string,status:Partial<Entity>):Promise<Entity  |null>

}


export interface IGetAllRepoDataUsingFieldUseCase<Entity>{

    execute(field:Partial<Entity>):Promise<Entity [] |null>

}

