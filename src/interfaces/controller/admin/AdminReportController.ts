



import { FilterDTO } from "@/application/dto/FilterDTO";
import { IChangeRespoStatusUseCase } from "@/application/interfaces/use-cases/IChangeRespoStatusUseCase";
import { IGetAllReportsUsecase } from "@/application/interfaces/use-cases/IReportUseCase";;
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { NextFunction, Request, Response } from "express";



export class AdminReportController<Entity> {
  constructor(
    private getAllReportsUsecase: IGetAllReportsUsecase,
    private changeRespoStatusUseCase: IChangeRespoStatusUseCase<Entity>
  ) { }


  getAllreports = async (req: Request, res: Response, next: NextFunction) => {
    try {


      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const search = req.query.search as string;


      const filter = new FilterDTO({ page, limit, status, search, })

      const allData = await this.getAllReportsUsecase.execute(filter)

      res.status(200).json({ status: true, message: "user data fetched success", reportsData: allData })


    } catch (error) {

      logger.error("err in reports", { err: error })

      return next(new AppError("err in get all reports", 400))

    }
  }



  updateReportStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("updated reports data", { data: req.body.update })
      const response = await this.changeRespoStatusUseCase.execute(req.body.update.id, req.body.update.status)

      res.status(200).json({ status: true, message: "user data fetched success", reportData: response })

    } catch (error) {
      logger.error("error", error)
      return next(new AppError("err in update report status", 400))

    }
  }
}