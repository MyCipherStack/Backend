

import { Types } from "mongoose";

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
    public testCases: { input: string; output: string; isSample: boolean }[] = [],
    public _id?: Types.ObjectId
  ) {}

}
