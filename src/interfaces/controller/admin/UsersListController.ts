import { NextFunction, Request, Response } from "express";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UpdateUserUseCase } from "../../../application/use-cases/UpdateUserUseCase";
import { UpdateUserDTO } from "../../../application/dto/UpdateUserDTO";
import { IGetFilteredUsersUseCase } from "../../../application/interfaces/use-cases/IGetFilteredUsersUseCase";
import { logger } from "@/logger";
import { AppError } from "@/domain/error/AppError";




export class UsersListController {
  constructor(
    private userRepository: IUserRepository,
    private getFilteredUsersUseCase: IGetFilteredUsersUseCase

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
      const userId = req.params.id;
      const updateData = new UpdateUserDTO(req.body)
      console.log(updateData);
      
      logger.info("update user ",{update:updateData})
      const updateUseCase = new UpdateUserUseCase(this.userRepository)
      
      const updatedUser = await updateUseCase.execute(userId, updateData)

      if (!updatedUser) {
        return next(new AppError("User not found",404))
      }

      res.status(200).json({ status: true, message: "User updated", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };

}