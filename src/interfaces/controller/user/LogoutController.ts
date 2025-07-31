import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { Request, Response } from "express";


export class LogoutController {

    logout = (req: Request, res: Response): Response => {
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
        return res.status(HttpStatusCode.OK).json({ message: 'Logged out successfully' });
    }



}