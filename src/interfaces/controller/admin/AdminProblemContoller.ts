import { Request, Response } from 'express';

import { ProblemDTO } from '../../../application/dto/ProblemDTO';
import { IAddProblemUseCase, IEditProblemUseCase } from '../../../application/interfaces/use-cases/IProblemUseCases';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class AdminProblemController {
  constructor(
        private addProblemUseCase: IAddProblemUseCase,
        private editProblemUseCase: IEditProblemUseCase,

  ) { }

  addProblem = async (req: Request, res: Response) => {
    try {
      console.log('add problem controller');

      const problem = new ProblemDTO(req.body);

      const problemData = await this.addProblemUseCase.execute(problem);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'problem Created success', problem: problemData });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ status: false, message: 'internal server error' });
      }
    }
  };

  editProblem = async (req: Request, res: Response) => {
    try {
      const problem = new ProblemDTO(req.body);
      const id = req.body._id;

      const problemData = await this.editProblemUseCase.execute(id, problem);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'problem edited successfully', problem: problemData });
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ status: false, message: 'internal server error' });
      }
    }
  };
}
