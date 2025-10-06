

export class Problem {
  constructor(
    public title: string,
    public problemId: string,
    public difficulty: string,
    public timeLimit: number = 1000,
    public memoryLimit: number = 128,
    public tags: string,
    public statement: string,
    public inputFormat: string,
    public outputFormat: string,
    public constraints: string,
    public testCases: { testCaseNo:number, input: string; output: string; isSample: boolean }[] = [],
    public functionSignatureMeta:object,
    public acceptance?:{submitted:number, accepted:number},
    public hint?:string,
    public starterCode?: Record<string, string>,
    public _id?: string,
    public status?:boolean,
  ) {}
}
