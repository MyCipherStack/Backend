export interface IBaseRepository<Entity>{

    create(data:Entity):Promise<Entity>;

    findById(Id:string):Promise<Entity|null>

    updateOneById(id:string, updatedData:Partial<Entity>):Promise<Entity| null>

    findAll():Promise<Entity[] | null>

    findAllwithField(field:Partial<Entity>):Promise<Entity[] | null>

}
