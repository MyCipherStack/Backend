import { BaseRepository } from "@/infrastructure/repositories/BaseRepository"
import { Submission } from "../entities/Submission"
import { ISubmissionDocument } from "@/infrastructure/database/SubmissionModel"
import { Problem } from "../entities/Problem"


export interface ISubmissionRepository extends BaseRepository<Submission, ISubmissionDocument> {

    getSubmissionsByProblem(userId: string, problemId: string): Promise<Submission[]>

    userSubmissionsCount(userId: string): Promise<{ date: string, count: number }[]>

    getAllRecentSubmission(userId: string, limit: number): Promise<Submission[]>

    userAcceptedSubmission(userId: string): Promise<Problem[]>

}
