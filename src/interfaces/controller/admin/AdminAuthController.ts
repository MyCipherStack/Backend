import { NextFunction, Request, Response } from "express";
import { LoginDTO } from "../../../application/dto/LoginDTO";
import { env } from "../../../config/env";
import { AppError } from "@/domain/error/AppError";
import { ILoginAdminUsecase } from "@/application/interfaces/use-cases/IAdminUseCase";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";


export class AdminAuthController {

    constructor(
        private loginAdminUsecase: ILoginAdminUsecase
    ) { }


    login = async (req: Request, res: Response, next: NextFunction) => {
        try {



            const data = new LoginDTO(req.body)
            const adminData = await this.loginAdminUsecase.execute(data.identifier, data.password)

            res.cookie("accessToken", adminData.accessToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 15,
                path: "/"
            })
            res.cookie("refreshToken", adminData.refreshToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: "/"
            })
            console.log(adminData);
            console.log(adminData.admin);

            res.status(HttpStatusCode.OK).json({ status: true, message: " logged successfull", admin: adminData.admin })


        } catch (error) {

            if (error instanceof AppError) {
                
                next(new AppError(error.message, HttpStatusCode.BAD_REQUEST))
            } else {
                next(new AppError("Internal server error", HttpStatusCode.INTERNAL_SERVER_ERROR))

            }

        }

    }




    logout = (req: Request, res: Response, next: NextFunction) => {
        try {


            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });


            return res.status(HttpStatusCode.OK).json({ message: 'Logged out successfully' });
        }

        catch (error) {

            next(new AppError("err in logout", HttpStatusCode.BAD_REQUEST))
        }
    }

}