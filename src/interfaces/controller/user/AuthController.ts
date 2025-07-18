import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "@/application/dto/CreateUserDTO";
import { LoginDTO } from "@/application/dto/LoginDTO";
import { env } from "@/config/env";
import { ICreateUserUseCase, ILoginUserUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { ISendOtpUseCase } from "@/application/interfaces/use-cases/IOtpUseCases";



// CreateUserUseCase, something like RegisterUserUseCase may better express intent (since it includes OTP logic right after).


export class AuthController{
    constructor(
        private createUserUseCase: ICreateUserUseCase,
        private sentOtpUsecase:ISendOtpUseCase,
        private loginUserUseCase:ILoginUserUseCase

    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = new CreateUserDTO(req.body)

            // const createUser = new CreateUserUseCase(this.userRepository, this.hashService,this.PendingUserRepository);

            const createdUserEmail = await this.createUserUseCase.execute(userData.name, userData.email, userData.password)
            //  createUser.execute(userData.name, userData.email, userData.password)
            
            // const setOtpUsecase = new SendOtpUseCase(this.otpService, this.PendingUserRepository)
            if (createdUserEmail) {


                await this.sentOtpUsecase.execute(createdUserEmail)

                res.status(201).json({ status: true, message: "OTP sented" })
            } else {

                next(new AppError('Something wentwrong', 400))

            }
        } catch (error: any) {

            logger.error(error.message, "backe end err in auth controller");

            next(new AppError(error.message, 400))

            // res.status(400).json({status:false,message:error.message })
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const loginData = new LoginDTO(req.body)

            // const loginUsecase = new LoginUserUseCase(this.userRepository, this.hashService, this.JwtService)
            let loginUserData = await this.loginUserUseCase.execute(loginData.identifier, loginData.password)
            console.log(loginUserData, "login use in controller");


            res.cookie("accessToken", loginUserData.accessToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 15,
                path: "/"
            })
            res.cookie("refreshToken", loginUserData.refreshToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: "/"
            })

            res.status(200).json({ status: true, message: "user logged success", user: loginUserData.user })

        }
        catch (error: any) {
            logger.error(error.message);

            next(new AppError(error.message, 400))

            // res.status(400).json({status:false,message:error.message })
        }

    }

}