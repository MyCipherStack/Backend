import { Request, Response } from "express";
import { ProfileDTO } from "../../application/dto/ProfileDTO.js";


export class ProfileController{
    constructor(){

    }

    update=(req:Request,res:Response)=>{
        try{
           
            
            const profileData=new ProfileDTO(req.body.personal,req.body.appearance,req.body.preferences,req.body.security)
            console.log(profileData);
            
            

        }catch(error){
            console.log(error);
            
        }
    }
}