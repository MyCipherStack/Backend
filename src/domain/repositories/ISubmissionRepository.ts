import { ISubmissionDocument } from "../../infrastructure/database/SubmissionModel.js";
import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { Submission } from "../entities/Submission.js";


export interface ISubmissionRepository extends BaseRepository<Submission, ISubmissionDocument> {

    getSubmissionsByProblem(userId: string, problemId: string): Promise<Submission[]>

    userSubmissionsCount(userId: string): Promise<{ date: string, count: number }[]>
}