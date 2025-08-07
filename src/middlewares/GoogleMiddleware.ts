import { Request, Response } from 'express';


// export class GoogleMiddleware{

//        constructor(
//             private userRepository:IUserRepository
//         ){

//         }

//     verify=async(req:Request,res:Response)=>{

//         const foundUser=await this.userRepository.findByUserName(userPayload.name)
//         if(foundUser?.status==="banned"){
//             console.log("user blocked");

//             res.status(401).json({status:false,message:"This Account is banned"})
//         }
//     }
// }
