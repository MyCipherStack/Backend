import { NextFunction, Request, Response } from "express"
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase"
import { PremiumPlan } from "@/domain/entities/PremiumPlan"
import { ICreateRepoUseCase } from "@/application/interfaces/use-cases/ICreateRepoUseCase";
import { SubscriptionEntity } from "@/domain/entities/Subscription";
import { CreateSubscripctionDTO } from "@/application/dto/CreateSubscripctionDTO";
import { logger } from "@/logger";
import { AppError } from "@/domain/error/AppError";
import { IUpdateUserUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { User } from "@/domain/entities/User";




export class SubscriptionController {
    constructor(
        private getPremiumPlanUseCase: IGetRepositoryDataUseCase<PremiumPlan>,
        private createSubscritionUseCase: ICreateRepoUseCase<SubscriptionEntity>,
        private updateUseCase: IUpdateUserUseCase,
        private getSubcriptionUseCase: IGetRepositoryDataUseCase<SubscriptionEntity>,
        private getUserUseCase: IGetRepositoryDataUseCase<User>,


    ) { }



    getPlans = async (req: Request, res: Response, next: NextFunction) => {
        console.log("get plan controller");

        try {
            const response = await this.getPremiumPlanUseCase.allDoucuments()
            if (response) {

                const plans = response.filter(plan => plan.status != "deleted")
                res.status(200).json({ status: true, message: " fetched all Plans", plans })
            }

        } catch (error) {
            console.log(error);
            next(new AppError("create subcription failed", 500))

            // res.status(400).json({status:false,message:error})
        }
    }


    createSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let orderId = res.locals.orderId
            let transactionId = res.locals.paymentId
            let planDetails = res.locals.planDetails
            let user = req.user!
            logger.info({ meassage: "create subscription", user: req.user })

            const data = new CreateSubscripctionDTO({
                userId: user.id, transactionId,
               ... planDetails

            })


            const response = await this.createSubscritionUseCase.execute(data)

            const subscripctionId = response?._id

            await this.updateUseCase.execute(user.email, { subscripctionId, role: "premium" })

            logger.info("id", response._id)
            logger.info("create subcription", { data: response })
            res.status(200).json({ status: true, message: "create subscription" })


        } catch (error) {
            logger.error("err", error)

            next(new AppError("create subcription failed", 500))
        }
    }



    getSubcriptionData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.user?.id
            logger.info("id",id)
            logger.info("id",id)
            console.log(id)
            const userDetails = await this.getUserUseCase.OneDocumentByid(id!)
            logger.info("id",{userDetails})
            const subscripctionId = userDetails?.subscripctionId
            const data = await this.getSubcriptionUseCase.OneDocumentByid(subscripctionId!)
            logger.info("data",{data})

            res.status(200).json({ status: true, message: " subscription Details", data })

        } catch (error) {

            next(new AppError("fetchig failed failed", 500))


        }
    }














}