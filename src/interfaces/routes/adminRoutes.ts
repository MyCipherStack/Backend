
import express from  "express"
import { AdminAuthController } from "../controller/admin/AdminAuthController"
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository"
import { BcryptHashAlgorithm } from "../../services/hashing/BcryptHashAlgorithm"
import { HashService } from "../../services/hashing/HashService"
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm"
import { env } from "../../config/env"
import { JwtService } from "../../services/jwt/JwtService"
import { IAdminRepository } from "../../domain/repositories/IadminRepository"
import { UsersListController } from "../controller/admin/UsersListController"
import { IUserRepository } from "../../domain/repositories/IUserRepository"
import { UserRepository } from "../../infrastructure/repositories/UserRepository"
import { AdminProblemController } from "../controller/admin/AdminProblemContoller"
import { ProblemRepository } from "../../infrastructure/repositories/ProblemRepository"
import { IProblemRepository } from "../../domain/repositories/IProblemRepository"
import { AddProblemUseCase } from "../../application/use-cases/addProblemUseCase"
import { EditProblemUseCase } from "../../application/use-cases/EditProblemUseCase"
import { IAddProblemUseCase } from "../../application/interfaces/use-cases/IProblemUseCases"
import { AdminPremiumPlanController } from "../controller/admin/AdminPremiumPlanController"
import { PremiumPlanRepository } from "../../infrastructure/repositories/premiumPlanRepostiroy"
import { IpremiumPlanRepository } from "../../domain/repositories/IPremiumPlanRepositroy"
import { GetFilteredUsersUseCase } from "../../application/use-cases/GetFilteredUsers"



const router=express.Router()

    const adminRepository:IAdminRepository=new AdminRepository()
    const userRepository:IUserRepository=new UserRepository()
    const problemRespository:IProblemRepository=new ProblemRepository()
    const premiumPlanRepository:IpremiumPlanRepository=new PremiumPlanRepository()
    




    
    const algorithm=new BcryptHashAlgorithm()     // dip for hashServices
    const hashService:IHashAlgorithm=new HashService(algorithm)
    
    
    
    
    const accessToken=env.ACCESS_JWT_TOKEN
    const refreshToken=env.REFRESH_JWT_TOKEN
    const jwtService=new JwtService(accessToken,refreshToken)
    
    
    
    const addProblemUseCase:IAddProblemUseCase=new AddProblemUseCase(problemRespository)
    const editProblemUseCase=new EditProblemUseCase(problemRespository)
    const getFilteredUsersUseCase=new GetFilteredUsersUseCase(userRepository)


    // const addProblemUseCase=new AddProblemUseCase(problemRespository)


    const adminAuthController=new AdminAuthController(adminRepository,hashService,jwtService)
    const usersListController=new UsersListController(userRepository,getFilteredUsersUseCase)
    const adminProblemController=new AdminProblemController(addProblemUseCase,editProblemUseCase)
    const adminPremiumPlanController=new AdminPremiumPlanController(premiumPlanRepository)

router.post("/login",adminAuthController.login)
router.post("/logout",adminAuthController.logout)
router.get("/users",usersListController.getData) 
router.patch("/users/:id", usersListController.updateUser);
router.post("/addProblem",adminProblemController.addProblem );
router.post("/editProblem",adminProblemController.editProblem );
router.post("/createPremiumPlan",adminPremiumPlanController.createNewPlan)
router.get("/getAllPlans",adminPremiumPlanController.getPlans)
router.post("/editPremiumPlan",adminPremiumPlanController.editPlan)





export default router