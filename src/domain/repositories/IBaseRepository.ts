




export  interface IBaseRepository<T>{
    create(data:T):Promise<T| null>;
    findById(Id:string):Promise<T|null>
    updateOneById(id:string,updatedData:Partial<T>):Promise<T| null>

}
