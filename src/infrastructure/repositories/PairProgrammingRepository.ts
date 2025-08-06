import { Document, Types } from 'mongoose';
import { PairProgramming } from '@/domain/entities/PairProgramming'; 
import { IPairProgrammingRepository } from '@/domain/repositories/IPairProgrammingRepository';
import { IPairProgramming, PairProgrammingModel } from '../database/PairProgrammingModel';
import { BaseRepository } from './BaseRepository';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class PairProgrammingRepository extends BaseRepository<PairProgramming, IPairProgramming> implements IPairProgrammingRepository {
  constructor() {
    super(PairProgrammingModel);
  }

  async findOneChallenge(findData: Partial<PairProgramming>): Promise<PairProgramming | null> {
    const data = await PairProgrammingModel.findOne(findData).populate('problems');
    if (!data) return null;
    return this.toEntity(data);
  }

  async paginatedData(filters: { page: number, limit: number, type?: string; status?: string; search?: string, isBlocked?:string}): Promise<{
        data: any[];
        totalCount: number;
        totalPages: number;
    }> {
    const query: any = {};

    if (filters.type) {
      query.type = filters.type;
    }
    logger.info('searchingggggggg........Pair', { filters });
    if (filters.isBlocked) {
      query.isBlocked = filters.isBlocked;
    }
    if (filters.status) query.status = filters.status;
    if (filters.search) {
      query.challengeName = { $regex: filters.search, $options: 'i' };
    }
    const skip = (filters.page - 1) * filters.limit;

    const totalCount = await PairProgrammingModel.countDocuments(query);

    const totalPages = Math.ceil(totalCount / filters.limit);

    const response = await PairProgrammingModel.find(query).skip(skip).limit(filters.limit).lean();

    const data = response.map((data) => this.toEntity(data));
    logger.info('data', { data, totalCount });
    return { data, totalCount, totalPages };
  }

  protected toEntity(data: (IPairProgramming & Document) | null): PairProgramming | null {
    if (!data) return null;
    return new PairProgramming(
      data?.hostId.toString(),
      data.challengeName,
      data.duration,
      data.problems,
      data.type,
      data.joinCode,
      data.startTime.toString(),
      data.endTime.toString(),
      (data._id as Types.ObjectId)?.toString(),
      data.status,
      data.navigator,
      data.createdAt,
      data.updatedAt,
      data.isBlocked,

    );
  }
}
