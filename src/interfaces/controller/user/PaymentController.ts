import { AppError } from "@/domain/error/AppError"; 
import { IPaymentUseCases } from "@/application/interfaces/use-cases/IPaymentUseCases";
import { logger } from "@/logger"; 
import { NextFunction, Request, Response } from "express";
import { PremiumPlan } from "@/domain/entities/PremiumPlan";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";




export class PaymentController {
    constructor(
        private paymentUseCases: IPaymentUseCases,
        private getPremiumPlanUseCase: IGetRepositoryDataUseCase<PremiumPlan>,
    ) { }

    createPayment = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let id = req.body.id
            const planDetails = await this.getPremiumPlanUseCase.OneDocumentByid(id)
            logger.info("subscrition eee", { asd: planDetails._id })

            if (planDetails) {

                const orderDetails = await this.paymentUseCases.createPayment(planDetails?.price, planDetails._id)
                return res.json({ status: true, orderId: orderDetails.orderId })
            } else {
                logger.error("err in subscribe controller")
                throw new AppError("Error on fetching data from database", 400)
            }

        } catch (error) {
            logger.error({ message: "error", err: error })
            return next(new AppError("Error on subscribe plan", 400))
        }
    }






    verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
        try {

            logger.info("verify payment")
            logger.info({ message: "body", res: req.body.response })
            const user = req.user as { id: string }
            
            const data = await this.paymentUseCases.verifyPayment(req.body.response)
            
            let IsVerifiedSuccess = data.status
            if (IsVerifiedSuccess) {
            const planDetails = await this.getPremiumPlanUseCase.OneDocumentByid(data.planId)
            
            res.locals.planDetails = planDetails
            
            logger.info({ message: "verifypayment contoller", data })
            
            
                
                const updatedDatabase = await this.paymentUseCases.updateNewPayment({ userId: user.id, orderId: data.orderId, paymentId: data.paymentId, amount: data.amount, paymentMethord: "Razorpay", status: "success" })
                // const orderDetails=await this.paymentUseCases.ge
                
                res.locals.paymentId =updatedDatabase._id
                logger.info("payementid",{updatedDatabase})
                next()
                // res.status(200).json({status:true,message:"payment is verifited success"})
            } else {
                res.status(400).json({ status: true, message: "payment failed" })
            }
        } catch (error) {
            logger.error({ message: "failed verification", error })
            return new AppError("payment verification failed", 400)
        }
    }


}   