import { NextFunction, Request, Response } from "express"
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase"
import { PremiumPlan } from "@/domain/entities/PremiumPlan"
import { ICreateRepoUseCase } from "@/application/interfaces/use-cases/ICreateRepoUseCase";
import { SubscriptionEntity } from "@/domain/entities/Subscription";
import { CreateSubscripctionDTO } from "@/application/dto/CreateSubscripctionDTO";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { AppError } from "@/domain/error/AppError";
import { IUpdateUserUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { User } from "@/domain/entities/User";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";




export class SubscriptionController {
    constructor(
        private getPremiumPlanUseCase: IGetRepositoryDataUseCase<PremiumPlan>,
        private createSubscriptionUseCase: ICreateRepoUseCase<SubscriptionEntity>,
        private updateUseCase: IUpdateUserUseCase,
        private getSubscriptionUseCase: IGetRepositoryDataUseCase<SubscriptionEntity>,
        private getUserUseCase: IGetRepositoryDataUseCase<User>,


    ) { }



    getPlans = async (req: Request, res: Response, next: NextFunction) => {


        logger.info("get plan controller");


        try {
            const response = await this.getPremiumPlanUseCase.allDocuments()
            if (response) {

                const plans = response.filter(plan => plan.status != "deleted")
                res.status(200).json({ status: true, message: " fetched all Plans", plans })
            }

        } catch (error) {
            console.log(error);
            next(new AppError("create subcription failed", 500))

        }
    }


    createSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let orderId = res.locals.orderId
            let transactionId = res.locals.paymentId
            let planDetails = res.locals.planDetails
            let user = req.user!
            logger.info({ meassage: "create subscription", user })

            const data = new CreateSubscripctionDTO({
                userId: user.id, transactionId,
                ...planDetails

            })


            const response = await this.createSubscriptionUseCase.execute(data)

            const subscriptionId = response?._id

            await this.updateUseCase.execute(user.email, { subscriptionId, role: "premium" })

        
  
            res.status(HttpStatusCode.OK).json({ status: true, message: "create subscription" })


        } catch (error) {

            next(new AppError("create subcription failed", 500))
        }
    }



    getSubscriptionData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as { id: "string" }

            
            const userDetails = await this.getUserUseCase.OneDocumentById(user?.id)
            logger.info("id", { userDetails })
            const subscriptionId = userDetails?.subscriptionId
            const data = await this.getSubscriptionUseCase.OneDocumentById(subscriptionId!)
            if (data?.endDate && userDetails?.email) {
                if (data?.endDate! < new Date()) {
                    await this.updateUseCase.execute(userDetails?.email, { subscriptionId: "", role: "regular" })
                }
                
            }
            
            logger.info("subscrption Data", { data })
            res.status(HttpStatusCode.OK).json({ status: true, message: " subscription Details", data })

        } catch (error) {

            next(new AppError("fetchig failed failed", HttpStatusCode.BAD_REQUEST))


        }
    }














}