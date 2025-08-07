



export interface IRedisServices{
    get(key:string):Promise<string | null>
    set(key:string,value:string,expirySecond?:number):Promise<string | null>
    del(key:string):Promise<void>
}