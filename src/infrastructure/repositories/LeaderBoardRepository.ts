import { Document, ObjectId } from 'mongoose';
import { ILeaderBoardRepository } from '@/domain/repositories/ILeaderBoardRepository'; 
import { ILeaderBoard, leaderBoardModel } from '../database/LeaderBoard';
import { BaseRepository } from './BaseRepository';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { FilterDTO } from '@/application/dto/FilterDTO';
import { IsolvedProblem, leaderBoard } from '@/domain/entities/LeaderBoard';

export class LeaderBoardRepository extends BaseRepository<leaderBoard, ILeaderBoard> implements ILeaderBoardRepository {
  // async create(data: leaderBoard): Promise<leaderBoard> {
  //     const leaderBoardData = await leaderBoardModel.create(data)
  //     return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)
  // }

  constructor() {
    super(leaderBoardModel);
  }

  async findOne(filter: Partial<leaderBoard>): Promise<leaderBoard | null> {
    const leaderBoardData = await leaderBoardModel.findOne(filter);
    return this.toEntity(leaderBoardData);
  }

  async findAllWithUserDeatils(filter: Partial<leaderBoard>): Promise<leaderBoard[]> {
    const leaderBoardData = await leaderBoardModel.find(filter).populate('userId').sort({ totalScore: 1 });
    return leaderBoardData.map((doc) => this.toEntity(doc)).filter((doc) => doc != null);
  }

  async findOneAndUpdate(filter: { userId: string; challengeId: string; }, updateData: IsolvedProblem): Promise<leaderBoard | null> {
    console.log('in Repo updatedData', updateData);

    const leaderBoardData = await leaderBoardModel.findOneAndUpdate({ userId: filter.userId, challengeId: filter.challengeId }, { $push: { solvedProblems: updateData }, $inc: { totalScore: updateData.score } }, { new: true });
    return this.toEntity(leaderBoardData);
  }

  async findAllwithChallengeDetails(userId: string, filters: FilterDTO): Promise<{ leaderBoard:leaderBoard[], totalData:number, totalPages:number}| null> {



    const query: any = {};
    if (filters.role) {
      query.role = filters.role;
    }
    // if (filters.status) query.status = filters.status;
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
      ];
    }
    const skip = (filters.page - 1) * filters.limit;
    const totalData = await leaderBoardModel.countDocuments(query);
    
    logger.info("filterdata",{filters,totalData})
    
    const totalPages = Math.ceil(totalData / filters.limit);
    
    const users = await leaderBoardModel.find(query).skip(skip).limit(filters.limit).lean();



    const leaderBoardData = await leaderBoardModel.find({ userId }).populate('challengeId').

      skip(skip).limit(filters.limit).lean();


    let leaderBoard=leaderBoardData.map((doc) => this.toEntity(doc)).filter((doc) => doc != null);

    return { leaderBoard, totalData, totalPages };


  }

  // async findById(Id: string): Promise<Partial<leaderBoard> | null> {
  //     const leaderBoardData=await leaderBoardModel.findById(Id)
  //     if(!leaderBoardData) return null
  //     return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)

  // }

  protected toEntity(data: (ILeaderBoard & Document) | null): leaderBoard | null {
    if (!data) return null;
    return new leaderBoard(
      data.challengeId,
      data.userId?.toString(),
      data.totalScore,
      data.rank,
      data.solvedProblems.map((problem) => ({ ...problem, problemId: problem.problemId.toString(), submissionId: problem.submissionId.toString() })),
    );
  }
}
