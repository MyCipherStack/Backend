import { Document } from 'mongoose';
import adminModel, { IAdmin } from '../database/AdminModel';
import { BaseRepository } from './BaseRepository';
import { IAdminRepository } from '@/domain/repositories/IAdminRepository';
import { Admin } from '@/domain/entities/Admin';

export class AdminRepository extends BaseRepository<Admin, IAdmin> implements IAdminRepository {
  constructor() {
    super(adminModel);
  }

  async findByAdminName(name: string): Promise<Admin | null> {
    const admin = await adminModel.findOne({ name }).lean();
    if (!admin) return null;
    return this.toEntity(admin);
  }

  //    async findByIdAndUpdate(id: string, fiedlsToUpdate: Partial<{ refreshToken: string; }>): Promise<Admin | null> {
  //         const admin =await adminModel.findByIdAndUpdate(id,{$set:fiedlsToUpdate},{new:true}).lean()
  //         if(!admin) return null
  //          return new Admin(admin.name,admin.password,admin.id)
  //     }

  protected toEntity(data: (IAdmin & Document) | null): Admin | null {
    if (!data) return null;
    return new Admin(
      data.name,
      data.password,
      data.id,
    );
  }
}
