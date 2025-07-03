


import { NextFunction, Request, Response } from "express";
import { ResetPasswordUseCase } from "../../../application/use-cases/ResetPasswordUsecase";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IHashAlgorithm } from "../../../domain/services/IHashAlgorithm";
import { IResetPasswordUseCase } from "@/application/interfaces/use-cases/IResetPasswordUseCase";
import { AppError } from "@/domain/error/AppError";


export class ResetPasswordContoller {
    constructor(

        private resetPasswordUseCase: IResetPasswordUseCase
    ) { }

    reset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("reset");
            let cookie = req.cookies["otpAccess"]
            const data = req.body
            console.log(cookie, "SADf");
            console.log(data, "data");
            console.log(data.password, "password");

            if (!cookie) {
                console.log("ASdfasdfasdfasdf");
                throw new Error("Session expired.Please request OTP again.")
            }
            // const isValid=await this.jwtService.varifyAccessToken(cookie)
            // console.log(isValid,"toke report");





            await this.resetPasswordUseCase.execute(cookie.email, data.password)

            res.status(200).json({ status: true, message: "password changed" })

        } catch (error: any) {


            next(new AppError(error.message, 500))

            // res.status(400).json({status:false,message:error.message })
        }

    }
}