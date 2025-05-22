
import express from  "express"
import { AdminAuthContoller } from "../controller/admin/AdminAuthContoller.js"
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository.js"
import { BcryptHashAlgorithm } from "../../services/hashing/BcryptHashAlgorithm.js"
import { HashService } from "../../services/hashing/HashService.js"
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js"
import { env } from "../../config/env.js"
import { JwtService } from "../../services/jwt/JwtService.js"
import { IAdminRepository } from "../../domain/repositories/IadminRepository.js"
import { UsersListController } from "../controller/admin/UsersListController.js"
import { IUserRepository } from "../../domain/repositories/IUserRepository.js"
import { UserRepository } from "../../infrastructure/repositories/UserRepository.js"
import { AdminProblemController } from "../controller/admin/AdminProblemContoller.js"
import { ProblemRepository } from "../../infrastructure/repositories/ProblemRepository.js"
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js"
import { AddProblemUseCase } from "../../application/use-cases/addProblemUseCase.js"
import { EditProblemUseCase } from "../../application/use-cases/EditProblemUseCase.js"
import { IAddProblemUseCase } from "../../application/interfaces/use-cases/IProblemUseCases.js"
import { AdminPremiumPlanController } from "../controller/admin/AdminPremiumPlanController.js"
import { PremiumPlanRepository } from "../../infrastructure/repositories/premiumPlanRepostiroy.js"
import { IpremiumPlanRepository } from "../../domain/repositories/IPremiumPlanRepositroy.js"



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

    // const addProblemUseCase=new AddProblemUseCase(problemRespository)


    const adminAuthContoller=new AdminAuthContoller(adminRepository,hashService,jwtService)
    const usersListController=new UsersListController(userRepository)
    const adminProblemController=new AdminProblemController(addProblemUseCase,editProblemUseCase)
    const adminPremiumPlanController=new AdminPremiumPlanController(premiumPlanRepository)

router.post("/login",adminAuthContoller.login)
router.post("/logout",adminAuthContoller.logout)
router.get("/users",usersListController.getData) 
router.patch("/users/:id", usersListController.updateUser);
router.post("/addProblem",adminProblemController.addProblem );
router.post("/editProblem",adminProblemController.editProblem );
router.post("/createPremiumPlan",adminPremiumPlanController.createNewPlan)
router.get("/getAllPlans",adminPremiumPlanController.getPlans)
router.post("/editPremiumPlan",adminPremiumPlanController.editPlan)





export default router