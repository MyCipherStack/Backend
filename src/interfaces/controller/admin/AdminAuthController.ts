import { NextFunction, Request, Response } from "express";
import { LoginDTO } from "../../../application/dto/LoginDTO";
import { env } from "../../../config/env";
import { logger } from "@/logger";
import { AppError } from "@/domain/error/AppError";
import { ILoginAdminUsecase } from "@/application/interfaces/use-cases/IAdminUseCase";


export class AdminAuthController {

    constructor(
        private loginAdminUsecase:ILoginAdminUsecase
    ) { }


    login = async (req: Request, res: Response) => {
        try {


            console.log("admin login");

            console.log(req.body);


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

            res.status(200).json({ status: true, message: " logged successfull", admin: adminData.admin })


        } catch (error) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message })

        }

    }


    logout = (req: Request, res: Response, next: NextFunction) => {
        try {

            console.log("logout controller is working");

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


            return res.status(200).json({ message: 'Logged out successfully' });
        }

        catch (error) {
            logger.error("err in logout err", error)
            next(new AppError("err in logout", 400))
        }
    }

}