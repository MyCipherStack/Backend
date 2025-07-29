import { Document } from "mongoose";
import { Submission } from "../../domain/entities/Submission";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository";
import { ISubmissionDocument, submissionModel } from "../database/SubmissionModel";
import { BaseRepository } from "./BaseRepository";
import { Problem } from "@/domain/entities/Problem";








export class SubmissionRepository extends BaseRepository<Submission, ISubmissionDocument> implements ISubmissionRepository {


    constructor() {
        super(submissionModel)
    }



    async userAcceptedSubmission(userId: string): Promise<Problem[]> {


        const res = await submissionModel.aggregate([
            {
                $match: {
                    userId, status: "Accepted"
                }
            },
            {
                $group: {
                    _id: "$problemId",
                }
            },
            {
                $lookup: {
                    from: "problems",
                    localField: "_id",
                    foreignField: "_id",
                    as: "problemDetails"
                }
            },
            {
                $unwind:"$problemDetails"
            },{
                $replaceRoot:{newRoot:"$problemDetails"}
            }
        ])


        return res
    }






    async getSubmissionsByProblem(userId: string, problemId: string): Promise<Submission[]> {
        const res = await submissionModel.find({ userId, problemId })
        return res.map(doc => this.toEntity(doc)).filter(doc => doc != null)
    }


    async userSubmissionsCount(userId: string): Promise<{ date: string, count: number }[]> {


        const submissionsCount = await submissionModel.aggregate([

            { $match: { userId } },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d", date: '$createdAt'
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    count: 1
                }
            },

            {
                $sort: { _id: 1 }
            },

        ])

        return submissionsCount as { date: string, count: number }[]
    }




    async getAllRecentSubmission(userId: string, limit: number): Promise<Submission[]> {

        const res = await submissionModel.find({ userId }).sort({ createdAt: -1 }).limit(limit)

        return res.map(doc => this.toEntity(doc)).filter(doc => doc != null)

    }


    protected toEntity(data: (ISubmissionDocument & Document<unknown>) | null): Submission | null {
        if (!data) return null
        return new Submission(data.userId.toString(), data.problemId.toString(), data.code, data.language, data.status, data.runTime ?? 0, data.memory ?? 0, data.passedTestCases, data.totalTestCases, data.error ?? "", data.failingTestCaseResult, data.createdAt?.toString(), data._id.toString())

    }
}
