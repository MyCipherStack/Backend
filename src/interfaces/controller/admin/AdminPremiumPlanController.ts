import { NextFunction, Request, Response } from 'express';
import { PremiumPlanDTO } from '../../../application/dto/PremiumPlanDTO';
import { ICreateRepoUseCase } from '@/application/interfaces/use-cases/ICreateRepoUseCase';
import { IGetRepositoryDataUseCase } from '@/application/interfaces/use-cases/IGetRepositoryDataUseCase';
import { IEditPlanUseCase } from '@/application/interfaces/use-cases/IPlanUseCases';
import { PremiumPlan } from '@/domain/entities/PremiumPlan';
import { AppError } from '@/shared/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

/// CREATE COMMON USE CASE FOR THIS TYPE OF CREATIG NEW MODEL

export class AdminPremiumPlanController {
  constructor(
        private createPremiumRepoUseCase: ICreateRepoUseCase<PremiumPlan>,
        private getPremiumDataUseCase: IGetRepositoryDataUseCase<PremiumPlan>,
        private EditPlanUseCase: IEditPlanUseCase,

  ) { }


  createNewPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const premiumData = new PremiumPlanDTO(req.body);

      const response = await this.createPremiumRepoUseCase.execute(premiumData);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'new premium plan created', response });
    } catch (error: unknown) {
      const err = error as { code: number };
      if (err.code == 11000) { // review this code later
        return next(new AppError('plan name alreay exits',HttpStatusCode.CONFLICT));
      }
      next(new AppError('erro in creating new plan', HttpStatusCode.BAD_REQUEST));
    }
  };


  editPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const premiumData = new PremiumPlanDTO(req.body);

      const response = await this.EditPlanUseCase.execute(premiumData._id, premiumData);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'premium plan updated successfully', response });
    } catch (error: unknown) {
      const err = error as { code: number };
      if (err.code == 11000) {
        return next(new AppError('plan name alreay exits',HttpStatusCode.CONFLICT));
      }
      res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error });
    }
  };


  getPlans = async (req: Request, res: Response) => {
    try {
      const response = await this.getPremiumDataUseCase.allDocuments();
      if (response) {
        const plans = response.filter((plan) => plan.status != 'deleted');
        res.status(HttpStatusCode.OK).json({ status: true, message: ' fetched all Plans', plans });
      }
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error });
    }
  };
}
