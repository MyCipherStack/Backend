




export  interface IBaseRepository<T>{
    create(data:T):Promise<T>;
    findById(Id:string):Promise<T|null>

}
