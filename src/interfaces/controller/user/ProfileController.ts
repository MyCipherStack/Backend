import { NextFunction, Request, Response } from "express";
import { ProfileDTO } from "../../../application/dto/ProfileDTO";
import { IUpdateUserUseCase } from "../../../application/interfaces/use-cases/IUpdateUserUseCase";
import { IGetRepositoryDataUseCase } from "../../../application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IVerifyUserPasswordUseCase } from "../../../application/interfaces/use-cases/IUserPasswordUseCases";
import { ResetPasswordDTO } from "../../../application/dto/ResetPasswordDTO";
import { IResetPasswordUseCase } from "../../../application/interfaces/use-cases/IResetPasswordUseCase";
import { User } from "../../../domain/entities/User.js";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { AppError } from "@/domain/error/AppError";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

export class ProfileController {
    constructor(
        private updateUseCase: IUpdateUserUseCase,
        private getRepositoryDataUseCase: IGetRepositoryDataUseCase<User>,
        private verifyUserPasswordUseCase: IVerifyUserPasswordUseCase,
        private resetPasswordUseCase: IResetPasswordUseCase
    ) { }

    update = async (req: Request, res: Response) => {
        try {

            const user = req.user as { email: string }

            const profileData = new ProfileDTO(req.body.personal, req.body.appearance, req.body.preferences)

            const data = await this.updateUseCase.execute(user.email, profileData)
            if (data)
                res.status(HttpStatusCode.OK).json({ status: true, message: "problems fetched success", user: { name: data.name, email: data.email, image: data.image } })
        } catch (error: any) {
            res.status(400).json({ status: false, message: error.message })
        }
    }


    getData = async (req: Request, res: Response,next:NextFunction) => {
        try {
            logger.info("get profile data")
            console.log("get profile data")
            const user = req.user as { email: string, id: string }

            const profile = await this.getRepositoryDataUseCase.OneDocumentById(user.id.toString())
            if (profile) {
                console.log(profile, "profiledata");
                return res.status(HttpStatusCode.OK).json({ status: true, message: "Problems fetched success", user: profile })
            } else {
            next(new AppError("Something went wrong", 500))

                // res.status(400).json({ status: false, message: "Something went wrong" })
            }


        } catch (error) {
            next(new AppError("Something went wrong", 500))

            // return res.status(400).json({ status: false, message: "Something went wrong while fetching data" })
        }
    }



    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = new ResetPasswordDTO(req.body.formData, req.body.email)

            if (data.currentPassword === data.password) {
                next(new AppError("New password must be  different from old", 400))

            }
            const isValid = await this.verifyUserPasswordUseCase.execute(data.email, data.currentPassword)
            if (isValid) {
                this.resetPasswordUseCase.execute(data.email, data.password)

                res.status(HttpStatusCode.OK).json({ status: true, message: "password updated" })

            } else {
                next(new AppError("Incorrect current password", 409))

                // res.status(400).json({ status: false, message: "Incorrect current password" })

            }
        } catch (error) {
            console.log(error);

            next(new AppError("Something went wrong", 500))

            // res.status(400).json({ status: false, message: "Something went wrong while fetching data" })
        }

        
    }
}