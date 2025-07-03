import { NextFunction, Request, Response } from "express";
import { IOtpService } from "@/domain/services/IOtpService";
import { SendOtpUseCase } from "@/application/use-cases/SendOtpUseCase";
import { IPendingUserRepository } from "@/domain/repositories/IPendingUserRepository";
import { ISendOtpUseCase } from "@/application/interfaces/use-cases/IOtpUseCases";
import { AppError } from "@/domain/error/AppError";


export class ResendOtpController {
    constructor(

        private sendOtpUseCase: ISendOtpUseCase

    ) {

    }

    resend = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("resend in backend");

            // const data= new OtpDTO(req.body);
            let data = req.body

            await this.sendOtpUseCase.execute(data.email)
            res.status(200).json({ status: true, message: "OTP sented" })

        } catch (error: any) {

            next(new AppError(error.message, 500))

        }

    }
}