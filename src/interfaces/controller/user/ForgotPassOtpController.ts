import { NextFunction, Request, Response } from "express";
import { env } from "@/config/env";
import { IResetPasswordOtpUseCase } from "@/application/interfaces/use-cases/IUserPasswordUseCases";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { AppError } from "@/domain/error/AppError";



export class ForgotPasswordOtpController {
    constructor(
        private resetPassswordOtpUseCase: IResetPasswordOtpUseCase
    ) { }
    sendOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = req.body
            console.log(data.email, "fogotpassword email");


            let otpToken = await this.resetPassswordOtpUseCase.execute(data.email)

            console.log(otpToken, "setting toke otp");


            res.cookie("otpAccess", otpToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 5,
                path: "/"
            })

            res.status(HttpStatusCode.OK).json({ status: true, message: "otp sented" })

            } catch (error: unknown) {
                if (error instanceof Error) {

                    next(new AppError(error.message, HttpStatusCode.BAD_REQUEST))
                } else {
                    next(new AppError("Internal server error", HttpStatusCode.INTERNAL_SERVER_ERROR))
                }

            }
    }
}


