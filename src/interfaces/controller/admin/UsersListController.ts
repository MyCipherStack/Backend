import { NextFunction, Request, Response } from "express";
import { UpdateUserDTO } from "../../../application/dto/UpdateUserDTO";
import { IGetFilteredUsersUseCase } from "../../../application/interfaces/use-cases/IGetFilteredUsersUseCase";
import { logger } from "@/logger";
import { AppError } from "@/domain/error/AppError";
import { IUpdateUserUseCase } from "@/application/interfaces/use-cases/IUserUseCase";




export class UsersListController {
  constructor(
    private getFilteredUsersUseCase: IGetFilteredUsersUseCase,
    private updateUserUseCase:IUpdateUserUseCase

  ) { }
  getData = async (req: Request, res: Response) => {
    try {

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const role = req.query.role as string;
      const status = req.query.status as string;
      const search = req.query.search as string;


      const data =await this.getFilteredUsersUseCase.execute({ page, limit, role, status, search })

      // const data1=await this.userRepository.getFiltersUsers({page,limit,role,status,search})

      res.status(200).json({ status: true, message: "user data fetched success", usersData: data })
      return
    } catch (error) {
      console.log(error);

    }
  }


  updateUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const userEmail = req.params.email;
      
      const updateData = new UpdateUserDTO(req.body)
      console.log("updateData",updateData);

      console.log(req.params,"params");
      
      // logger.info("update user ",{update:updateData}) 
      
      const updatedUser = await this.updateUserUseCase.execute(userEmail, updateData)

      if (!updatedUser) {
        return next(new AppError("User not found",404))
      }

      res.status(200).json({ status: true, message: "User updated", user: updatedUser });
    } catch (err) {

      logger.error(err);

      return next(new AppError("Internal server error",500))
    }
  };

}