import { Request, Response } from "express";
import { ProfileDTO } from "../../../application/dto/ProfileDTO";
import { IUpdateUserUseCase } from "../../../application/interfaces/use-cases/IUpdateUserUseCase";
import { IGetRepositoryDataUseCase } from "../../../application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IVerifyUserPasswordUseCase } from "../../../application/interfaces/use-cases/IVerifyUserPasswordUseCase";
import { ResetPasswordDTO } from "../../../application/dto/ResetPasswordDTO";
import { IResetPasswordUseCase } from "../../../application/interfaces/use-cases/IResetPasswordUseCase";
import { User } from "../../../domain/entities/User.js";
import { logger } from "@/logger";

export class ProfileController {
    constructor(
        private updateUseCase: IUpdateUserUseCase,
        private getRepositoryDataUseCase: IGetRepositoryDataUseCase<User>,
        private userRepositroy: IUserRepository,
        private verifyUserPasswordUseCase: IVerifyUserPasswordUseCase,
        private resetPasswordUseCase: IResetPasswordUseCase
    ) { }

    update = async (req: Request, res: Response) => {
        try {

            const user = req.user as { email: string }

            const profileData = new ProfileDTO(req.body.personal, req.body.appearance, req.body.preferences)

            const data = await this.updateUseCase.execute(user.email, profileData)
            if (data)
                res.status(200).json({ status: true, message: "problems fetched success", user: { name: data.name, email: data.email, image: data.image } })
        } catch (error: any) {
            res.status(400).json({ status: false, message: error.message })
        }
    }


    getData = async (req: Request, res: Response) => {
        try {
            logger.info("get profile data")
            console.log("get profile data")
            const user = req.user as { email: string, id: string }

            const profile = await this.getRepositoryDataUseCase.OneDocumentByid(user.id.toString())
            if (profile) {
                console.log(profile, "profiledata");
                return res.status(200).json({ status: true, message: "Problems fetched success", user: profile })
            } else {
                res.status(400).json({ status: false, message: "Something went wrong" })
            }


        } catch (error) {
            return res.status(400).json({ status: false, message: "Something went wrong while fetching data" })
        }
    }



    resetPassword = async (req: Request, res: Response) => {
        try {
            const data = new ResetPasswordDTO(req.body.formData, req.body.email)

            const isValid = await this.verifyUserPasswordUseCase.execute(data.email, data.currentPassword)

            if (isValid) {
                this.resetPasswordUseCase.execute(data.email, data.password)

                res.status(200).json({ status: true, message: "password updated" })

            } else {
                res.status(400).json({ status: false, message: "Incorrect current password" })

            }
        } catch (error) {
            console.log(error);

            res.status(400).json({ status: false, message: "Something went wrong while fetching data" })
        }
    }
}