import { Problem } from "@/domain/entities/Problem";




export class ProblemMapper {

    static toResponseDTO(challenge: Problem) {
        return {
            title:challenge.title,
            problemId: challenge.problemId,
            difficulty: challenge.difficulty,
            timeLimit: challenge.timeLimit,
            memoryLimit: challenge.memoryLimit,
            tags: challenge.tags,
            statement: challenge.statement,
            inputFormat: challenge.inputFormat,
            outputFormat: challenge.outputFormat,
            constraints: challenge.constraints,
            testCases: challenge.testCases,
            functionSignatureMeta:challenge.functionSignatureMeta,
            acceptance: challenge.acceptance || { submitted: 0, accepted: 0 },
            hint:challenge.hint || "",
            starterCode: challenge.starterCode || {},
            _id: challenge._id || "",
        }
    }
}