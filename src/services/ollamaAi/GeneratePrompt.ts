import { Problem } from "@/domain/entities/Problem";




export class GeneratePrompt {

    createSolutionPrompt(problemDetails: Problem, language: string): string {

        return `You are a coding assistant. Given the problem details, generate a solution prompt.

            problem:${problemDetails.title}
            
            statement:${problemDetails.statement}

            constraints:${problemDetails.constraints}

            hint:${problemDetails.hint}


            user this signature:
            ${problemDetails.starterCode!["javascript"]}

            write a complete JavaScript solution using the above signature.

            Explain that logic 

            Mention the time and space complexity of the solution

            Respond in object format with the following keys:

            {
            "solution": "The solution code as a string",
            "explanation": "A detailed explanation of the solution logic",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)"     
            }
`
    }

}