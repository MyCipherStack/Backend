import { GroupChallenge } from "../../domain/entities/GroupChallenge";
import { IChallengeRepository } from "@/domain/repositories/IChallengeRepository";
import { groupChallengeModel, IGroupChallenge } from "../database/GroupChallengeModel";
import { BaseRepository } from "./BaseRepository";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { Document, Types } from "mongoose";


export class ChallengeRepository extends BaseRepository<GroupChallenge, IGroupChallenge> implements IChallengeRepository {


    constructor() {
        super(groupChallengeModel)
    }

    async findOneChallenge(data: Partial<GroupChallenge>): Promise<GroupChallenge | null> {

        const challengeData = await groupChallengeModel.findOne(data).populate("problems")



        return this.toEntity(challengeData)
    }

    async findAllByFields(data: Partial<GroupChallenge>): Promise<GroupChallenge[] | null> {

        const challengeData = await groupChallengeModel.find(data)

        if (!challengeData) return null

        return challengeData.map(data => this.toEntity(data)).filter(data => data != null)

    }





    async paginatedData(filters: { page: number, limit: number,isBlocked?:string,  search?: string, status?: string,type?: string}): Promise<{
        datas: any[];
        totalCount: number;
        totalPages: number;
    }> {
        let query: any = {}
        if (filters.type) {
            query.type = filters.type
        }
        if (filters.isBlocked) {

            query.isBlocked = filters.isBlocked
        }
        if (filters.status) query.status = filters.status
        if (filters.search) {
            query.challengeName = { $regex: filters.search, $options: "i" }
        }
        const skip = (filters.page - 1) * filters.limit

        const totalCount = await groupChallengeModel.countDocuments(query);


        const totalPages = Math.ceil(totalCount / filters.limit);
        logger.info("pageination data", { totalCount, totalPages })

        let response = await groupChallengeModel.find(query).skip(skip).limit(filters.limit).lean()

        // console.log(response);
        let datas = response.map(data => { return this.toEntity(data) })


        return { datas, totalCount, totalPages }
    }






    protected toEntity(data: (IGroupChallenge & Document) | null): GroupChallenge | null {
        if (!data) return null
        return new GroupChallenge(
            data.challengeName,
            data.maxParticipants,
            data.duration,
            data.problems,
            data.type,
            data.joinCode,
            data.startTime,
            data.endTime,
            data.status,
            (data._id as Types.ObjectId).toString(),
            data.createdAt,
            data.updatedAt,
            data?.hostId.toString(),
            data?.isBlocked,

        )
    }
} 