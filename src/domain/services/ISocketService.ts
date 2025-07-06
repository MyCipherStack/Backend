



export interface INotificationSocket{

     emitNotification(userId:string,payload:unknown):Promise<void>
    
}