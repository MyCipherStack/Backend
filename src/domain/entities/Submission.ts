export class Submission {
  constructor(
        public userId:string,

        public problemId:string,

        public code:string,

        public language:string,

        public status:string,

        public runTime:number,

        public memory:number,

        public passedTestCases:number,

        public totalTestCases:number,

        public error:string,

        public failingTestCaseResult?:{
            input?:string | null,
            output?:string |null
            compile_output?:string |null
        } | null,

        public createdAt?: string,

        public id?:string,
  ) {}
}
