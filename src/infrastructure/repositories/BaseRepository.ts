import { IBaseRepository } from '@/domain/repositories/IBaseRepository';
import { Document, FilterQuery, Model } from 'mongoose';

export abstract class BaseRepository<Entity, ModelSchema> implements IBaseRepository<Entity> {
  constructor(protected readonly model: Model<ModelSchema & Document>) { }

  async create(data: Entity): Promise<Entity> {
    const created = await this.model.create(data);
    return this.toEntity(created) as Entity;
  }

  async findById(id: string): Promise<Entity | null> {
    const findedData = await this.model.findById(id); // removed .lean() any problem
    if (!findedData) return null;
    return this.toEntity(findedData);
  }

  async updateOneById(id: string, updatedData: Partial<Entity>): Promise<Entity | null> {
    const updated = await this.model.findByIdAndUpdate(id, updatedData as any, { upsert: true, new: true });
    return this.toEntity(updated);
  }

  async findAll(): Promise<Entity[] | null> {
    const allDocuments = await this.model.find();
    return allDocuments.map((data) => this.toEntity(data)).filter((data) => data != null);
  }

  async findAllwithField(field: FilterQuery<Entity>): Promise<Entity[] | null> {
    const findedDatas = await this.model.find(field);

    // logger.info("find all with feild", findedDatas)

    return findedDatas.map((data) => this.toEntity(data)).filter((data) => data != null);
  }

    protected abstract toEntity(data: ModelSchema & Document | null): Entity | null;
}
