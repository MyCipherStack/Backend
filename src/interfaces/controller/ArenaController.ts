import { Request, Response } from "express";




export class ArenaController{


    createGroupChallenge=async(req:Request,res:Response){
        try{
            console.log(req.body);
            
            res.status(200).json({status:true,message:"group challenge created",challenge:req.body})

        }catch{

        }

        




        
    }
}