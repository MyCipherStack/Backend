import { Request, Response } from "express";


export class LogoutController{

    logout=(req:Request,res:Response):Response=>{
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
        


}