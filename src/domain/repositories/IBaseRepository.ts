




export  interface IBaseRepository<Entity>{
    create(data:Entity):Promise<Entity| null>;
    findById(Id:string):Promise<Entity|null>
    updateOneById(id:string,updatedData:Partial<Entity>):Promise<Entity| null>

}
