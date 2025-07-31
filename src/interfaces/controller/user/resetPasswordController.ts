


import { NextFunction, Request, Response } from "express";
import { IResetPasswordUseCase } from "@/application/interfaces/use-cases/IResetPasswordUseCase";
import { AppError } from "@/domain/error/AppError";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";


export class ResetPasswordController {
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
                throw new Error("Session expired.Please request OTP again.")
            }
            // const isValid=await this.jwtService.varifyAccessToken(cookie)
            // console.log(isValid,"toke report");





            await this.resetPasswordUseCase.execute(cookie.email, data.password)

            res.status(HttpStatusCode.OK).json({ status: true, message: "password changed" })

        } catch (error: unknown) {
            if(error instanceof AppError){

                next(new AppError(error.message, HttpStatusCode.BAD_REQUEST))
            }else{
                next(new AppError("Internal server error", HttpStatusCode.INTERNAL_SERVER_ERROR))
                
            }
        }

    }
}