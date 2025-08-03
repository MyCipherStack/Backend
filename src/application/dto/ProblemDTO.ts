export class ProblemDTO {
  _id:string;

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

  hint:string;

  testCases: { input: string; output: string; isSample: boolean, explanation:string, testCaseNo:number }[];

  functionSignatureMeta:{
    name:string,
    parameters:[],
    returnType:{type:string}};

  starterCode:Record<string, string>;

  status:boolean;

  constructor(data:ProblemDTO) {
    this._id = data._id;
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
    this.hint = data.hint;
    this.testCases = data.testCases;
    this.functionSignatureMeta = data.functionSignatureMeta,
    this.starterCode = data.starterCode;
    this.status = data.status;

    console.log(data.functionSignatureMeta);

    // Check if test cases are provided
    if (this.testCases.length === 0) {
      throw new Error('At least one test case is required.');
    }
  }
}
