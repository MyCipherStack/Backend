import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../domain/services/IJwtService";
import { env } from "../config/env";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { AppError } from "@/domain/error/AppError";


interface IRepoData {
    status: string, email: string, name: string, _id: string
}




// ADMIN AND USER HAVE SAME Authenticate CONTROLLER (

export class Authenticate<Entity> {
    constructor(
        private jwtService: IJwtService,
        private getRepositoryDataUseCase: IGetRepositoryDataUseCase<Entity>
    ) { }
    verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("validating user");

            const accessToken = req.cookies["accessToken"]
            const refreshToken = req.cookies["refreshToken"]

            if (!accessToken && !refreshToken) {
                logger.error("no refresh access token");

                return res.status(401).json({ status: false, message: "login  expired" })
            }


            if (accessToken) {


                logger.info("access token found")

                const tokenData = await this.jwtService.varifyAccessToken(accessToken)
                logger.info("TokenDAsat", tokenData)
                // const userPayload=this.jwtService.varifyAccessToken(accessToken)
                if (tokenData) {

                    const foundUser = await this.getRepositoryDataUseCase.OneDocumentById(tokenData.userId) as IRepoData


                    logger.info("access token valid")

                    if (foundUser?.status && foundUser?.status === "banned") {
                        logger.info("user blocked");

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

                        return res.status(401).json({ status: false, message: "This Account is banned" })
                    }
                    if (foundUser) {


                        req.user = { role: tokenData.role, email: foundUser.email, name: foundUser.name, id: foundUser._id }   // i can use other routesn

                        return next()
                    } else {
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
                        return next(new AppError("user not found: Unauthorized ", 401))
                    }

                }
            }
            if (refreshToken) {
                console.log("refreshToken found");
                const userPayload = this.jwtService.varifyRefreshToken(refreshToken)
                const { exp, iat, ...payload } = userPayload
                if (userPayload) {
                    const createAccesstoken = this.jwtService.signAccessToken(payload)
                    res.cookie("accessToken", createAccesstoken, {
                        httpOnly: true,
                        secure: env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 1000 * 60 * 15,
                        path: "/"
                    })
                    const foundUser = await this.getRepositoryDataUseCase.OneDocumentById(userPayload.userId) as IRepoData   

                    if (foundUser) {
                        req.user = { role: payload.role, email: foundUser.email, name: foundUser.name, id: foundUser._id } // i can use other routesn

                        return next()
                    } else {

                        return next(new AppError("user not found", 404))
                    }
                }
            }
        } catch (error) {

            logger.error("err in auth middelware", error);

            return res.status(401).json({ status: false, message: "No token" })
        }
    }


}