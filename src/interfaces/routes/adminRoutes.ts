
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
import { Authenticate } from "@/middlewares/Authenticate"
import { RoleMiddleware } from "@/middlewares/roleMiddleware"
import { AuthMiddlwareBundler } from "@/middlewares/AuthMiddlwareBundler"
import { Admin } from "@/domain/entities/Admin"
import { GetRepositoryDataUseCase } from "@/application/use-cases/GetRepositoryDataUseCase"
import { ChallengeContoller } from "../controller/admin/ChallengeContoller"
import { ChallengeRepository } from "@/infrastructure/repositories/ChallengeRespository"
import { GroupChallenge } from "@/domain/entities/GroupChallenge"
import { PairProgramming } from "@/domain/entities/PairProgramming"
import { PairProgrammingRepository } from "@/infrastructure/repositories/PairProgrammingRepsitory"
import { IPairProgrammingRepository } from "@/domain/repositories/IPairProgrammingRepository"
import { DashboardBoardController } from "../controller/admin/DashboardController"
import { AdminDashBoardUseCase } from "@/application/use-cases/AdminDashBoardUseCase"
import { GetAllReportsUsecase } from "@/application/use-cases/GetAllReportsUsecase"
import { AdminReportController } from "../controller/admin/AdminReportController"
import { IReportRepository } from "@/domain/repositories/IReportRepository"
import { ReportRepository } from "@/infrastructure/repositories/ReportRepository"
import { ChangeRespoStatusUseCase } from "@/application/use-cases/ChangeRespoStatusUseCase"
import { Report } from "@/domain/entities/Report"
import { TransactionRespotitory } from "@/infrastructure/repositories/TransactionsRespositoy"




const router=express.Router()

    const adminRepository:IAdminRepository=new AdminRepository()
    const userRepository:IUserRepository=new UserRepository()
    const problemRespository:IProblemRepository=new ProblemRepository()
    const premiumPlanRepository:IpremiumPlanRepository=new PremiumPlanRepository()
    const challengeRepository:ChallengeRepository=new ChallengeRepository()
    const pairProgrammingRepository:IPairProgrammingRepository=new PairProgrammingRepository()
    const reportRepository:IReportRepository=new ReportRepository( )
    const transactionRepository=new TransactionRespotitory()




    
    const algorithm=new BcryptHashAlgorithm()     // dip for hashServices
    const hashService:IHashAlgorithm=new HashService(algorithm)
    
    
    
    
    const accessToken=env.ACCESS_JWT_TOKEN
    const refreshToken=env.REFRESH_JWT_TOKEN
    const jwtService=new JwtService(accessToken,refreshToken)
    
    
    
    const addProblemUseCase:IAddProblemUseCase=new AddProblemUseCase(problemRespository)
    const editProblemUseCase=new EditProblemUseCase(problemRespository)
    const getFilteredUsersUseCase=new GetFilteredUsersUseCase(userRepository)
    const adminDashBoardUseCase=new AdminDashBoardUseCase(userRepository,transactionRepository)
    const getAllReportsUsecase=new GetAllReportsUsecase(reportRepository)

          const getAdminRepoDataUseCase=new GetRepositoryDataUseCase<Admin>(adminRepository)
          const getchallengeRepoDataUseCase=new GetRepositoryDataUseCase<GroupChallenge>(challengeRepository)
          const getPaiProgarmmingRepoDataUseCase=new GetRepositoryDataUseCase<PairProgramming>(pairProgrammingRepository)
          const changeRespoStatusUseCase=new ChangeRespoStatusUseCase(reportRepository)

          
    

    // const addProblemUseCase=new AddProblemUseCase(problemRespository)


    const adminAuthController=new AdminAuthController(adminRepository,hashService,jwtService)
    const usersListController=new UsersListController(userRepository,getFilteredUsersUseCase)
    const adminProblemController=new AdminProblemController(addProblemUseCase,editProblemUseCase)
    const adminPremiumPlanController=new AdminPremiumPlanController(premiumPlanRepository)
    const challengeController=new ChallengeContoller(getchallengeRepoDataUseCase,getPaiProgarmmingRepoDataUseCase)
    const dashboardController=new DashboardBoardController(adminDashBoardUseCase)
    const adminReportController=new AdminReportController<Report>(getAllReportsUsecase,changeRespoStatusUseCase)



           let authenticate=new Authenticate(jwtService,getAdminRepoDataUseCase)
           let authorize=new RoleMiddleware()
           let auth=new AuthMiddlwareBundler(authenticate,authorize,"admin")

router.post("/login",adminAuthController.login)
router.post("/logout",adminAuthController.logout)
router.get("/users",auth.verify(),usersListController.getData) 
router.patch("/users/:id", auth.verify(),usersListController.updateUser);
router.post("/addProblem",auth.verify(),adminProblemController.addProblem );
router.post("/editProblem",auth.verify(),adminProblemController.editProblem );
router.post("/createPremiumPlan",auth.verify(),adminPremiumPlanController.createNewPlan)
router.get("/adminAllPlans",auth.verify(),adminPremiumPlanController.getPlans)
router.post("/editPremiumPlan",auth.verify(),adminPremiumPlanController.editPlan)


router.get("/getAllGroupChallenges",auth.verify(),challengeController.allGroupChallenges)
router.get("/getAllPairProgramming",auth.verify(),challengeController.getAllPairProgramming)
router.get("/dashboard",auth.verify(),dashboardController.getAllDashBoardData)

router.
route("/report")
.get(auth.verify(),adminReportController.getAllreports)
.patch(auth.verify(),adminReportController.updateReportStatus)






export default router