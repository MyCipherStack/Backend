import { Request, Response } from "express";
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { UpdateUserUseCase } from "../../../application/use-cases/UpdateUserUseCase.js";
import { UpdateUserDTO } from "../../../application/dto/UpdateUserDTO.js";




export class UsersListController{
   constructor(
    private userRepository: IUserRepository,

    ){}
    getData=async(req:Request,res:Response)=>{
        try{

                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 10;
                const role = req.query.role as string;
                const status = req.query.status as string;
                const search = req.query.search as string;

            console.log("getting data contoller");
            console.log(req.body);

            const data=await this.userRepository.getFiltersUsers({page,limit,role,status,search})
            
            res.status(200).json({status:true,message:"user data fetched success",usersData:data})
            return 
        }catch(error){
            console.log(error);
            
        }
    }
    
    
    updateUser = async (req: Request, res: Response) => {
        try {
              const userId = req.params.id;
              const updateData =new UpdateUserDTO(req.body)


              
              
              const updateUseCase=new UpdateUserUseCase(this.userRepository)
           const updatedUser= await   updateUseCase.execute(userId,updateData)
          
              if (!updatedUser) {
                return res.status(404).json({ status: false, message: "User not found" });
              }
          
              res.status(200).json({ status: true, message: "User updated", user: updatedUser });
            } catch (err) {
              console.error(err);
              res.status(500).json({ status: false, message: "Internal server error" });
            }
          };
          
}