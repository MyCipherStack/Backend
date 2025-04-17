export class ProblemDTO {
    title: string;
    problemId: string;
    difficulty: string;
    timeLimit: number;
    memoryLimit: number;
    tags: string;
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    testCases: { input: string; output: string; isSample: boolean }[];
  
    constructor(data: {
      title: string;
      problemId: string;
      difficulty: string;
      timeLimit?: number;
      memoryLimit?: number;
      tags: string;
      statement: string;
      inputFormat: string;
      outputFormat: string;
      constraints: string;
      testCases: { input: string; output: string; isSample: boolean }[];
    }) {
      this.title = data.title.trim();
      this.problemId = data.problemId.trim();
      this.difficulty = data.difficulty.trim();
      this.timeLimit = data.timeLimit || 1000;
      this.memoryLimit = data.memoryLimit || 128;
      this.tags = data.tags.trim();
      this.statement = data.statement.trim();
      this.inputFormat = data.inputFormat.trim();
      this.outputFormat = data.outputFormat.trim();
      this.constraints = data.constraints.trim();
      this.testCases = data.testCases;
  

  
      // Check if test cases are provided
      if (this.testCases.length === 0) {
        throw new Error("At least one test case is required.");
      }
    }
  }
  