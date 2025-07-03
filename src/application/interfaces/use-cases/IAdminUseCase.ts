


export interface IAdminDashBoardUseCase{

    execute(range:string):Promise<{}>
    
    
}


export interface ILoginAdminUsecase{
    execute(name:string,password:string):Promise<{admin:{name:string},refreshToken:string,accessToken:string}>
}