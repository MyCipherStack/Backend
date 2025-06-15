
import { AppError } from "../domain/error/AppError";
import { NextFunction, Request, Response } from "express";



export function ErrorHandler(err:Error,req:Request,res:Response,next:NextFunction){
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success:false,
            message:err.message
        })
    }

    return res.status(500).json({
        success:false,
        message:err.message
    })
}