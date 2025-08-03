import { Document } from 'mongoose';
import { PendingUser } from '../../domain/entities/PendingUser';
import { IPendingUserRepository } from '../../domain/repositories/IPendingUserRepository';
import { IPendingUser, PendingUserModel } from '../database/PendingUser';
import { BaseRepository } from './BaseRepository';

export class PendingUserRepository extends BaseRepository<PendingUser, IPendingUser> implements IPendingUserRepository {
  constructor() {
    super(PendingUserModel);
  }
  // async create): Promise<string> {
  //  const user=await PendingUser.create({name,email,password,otp})
  //  return user.email

  // }

  // async create(data: temUser): Promise<temUser> {
  //  const user=await PendingUser.create({name:data.name,email:data.email,password:data.password,otp:data.otp})
  //  return  new temUser(user.name,user.email,user.password)
  // }

  // async findById(Id: string): Promise<temUser | null> {

  //   const user=  await PendingUser.findById(Id).lean()
  //   if(!user) return null
  //     return new temUser(user?.name,user?.email)
  // }
  async updateOtp(email:string, temUser: string):Promise<void> {
    await PendingUserModel.findOneAndUpdate({ email }, { otp: temUser, createdAt: new Date() });
  }

  async findValidUser(email: string): Promise<PendingUser | null> {
    const found = await PendingUserModel.findOne({ email });
    console.log(found, 'data in pendn userModel');

    if (!found) return null;
    return this.toEntity(found);
    // return new temUser(found.name,found.email,found.password,found.createdAt,found.otp)
  }

  async delete(email: string): Promise<void> {
    await PendingUserModel.deleteOne({ email });
  }

  protected toEntity(data: (IPendingUser & Document) | null): PendingUser | null {
    if (!data) return null;
    return new PendingUser(data.name, data.email, data.password, data.createdAt, data.otp);
  }
}
