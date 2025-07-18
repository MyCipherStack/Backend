
import express from "express"
import { AdminAuthController } from "../controller/admin/AdminAuthController"
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository"
import { BcryptHashAlgorithm } from "../../services/hashing/BcryptHashAlgorithm"
import { HashService } from "../../services/hashing/HashService"
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm"
import { env } from "../../config/env"
import { JwtService } from "../../services/jwt/JwtService"
import { IAdminRepository } from "@/domain/repositories/IAdminRepository"
import { UsersListController } from "../controller/admin/UsersListController"
import { IUserRepository } from "../../domain/repositories/IUserRepository"
import { UserRepository } from "../../infrastructure/repositories/UserRepository"
import { AdminProblemController } from "../controller/admin/AdminProblemContoller"
import { ProblemRepository } from "../../infrastructure/repositories/ProblemRepository"
import { IProblemRepository } from "../../domain/repositories/IProblemRepository"
import { AddProblemUseCase } from "@/application/use-cases/admin/AddProblemUseCase" 
import { EditProblemUseCase } from "../../application/use-cases/EditProblemUseCase"
import { IAddProblemUseCase } from "../../application/interfaces/use-cases/IProblemUseCases"
import { AdminPremiumPlanController } from "../controller/admin/AdminPremiumPlanController"
import { PremiumPlanRepository } from "../../infrastructure/repositories/premiumPlanRepostiroy"
import { IpremiumPlanRepository } from "../../domain/repositories/IPremiumPlanRepositroy"
import { GetFilteredUsersUseCase } from "../../application/use-cases/GetFilteredUsers"
import { Authenticate } from "@/middlewares/Authenticate"
import { RoleMiddleware } from "@/middlewares/RoleMiddleware" 
import { AuthMiddlwareBundler } from "@/middlewares/AuthMiddlwareBundler"
import { Admin } from "@/domain/entities/Admin"
import { GetRepositoryDataUseCase } from "@/application/use-cases/GetRepositoryDataUseCase"
import {  ChallengeController } from "../controller/admin/ChallengeController"
import { ChallengeRepository } from "@/infrastructure/repositories/ChallengeRespository"
import { GroupChallenge } from "@/domain/entities/GroupChallenge"
import { PairProgramming } from "@/domain/entities/PairProgramming"
import { PairProgrammingRepository } from "@/infrastructure/repositories/PairProgrammingRepsitory"
import { IPairProgrammingRepository } from "@/domain/repositories/IPairProgrammingRepository"
import { DashboardBoardController } from "../controller/admin/DashboardController"
import { AdminDashBoardUseCase } from "@/application/use-cases/admin/AdminDashBoardUseCase" 
import { GetAllReportsUsecase } from "@/application/use-cases/GetAllReportsUsecase"
import { AdminReportController } from "../controller/admin/AdminReportController"
import { IReportRepository } from "@/domain/repositories/IReportRepository"
import { ReportRepository } from "@/infrastructure/repositories/ReportRepository"
import { ChangeRespoStatusUseCase } from "@/application/use-cases/ChangeRespoStatusUseCase"
import { Report } from "@/domain/entities/Report"
import { TransactionRespotitory } from "@/infrastructure/repositories/TransactionsRespositoy"
import { UpdateUserUseCase } from "@/application/use-cases/UpdateUserUseCase"
import { LoginAdminUsecase } from "@/application/use-cases/admin/LoginAdminUsecase"
import { CreateRepoUseCase } from "@/application/use-cases/CreateRepoUseCase"
import { EditPlanUseCase } from "@/application/use-cases/admin/EditPlanUseCase"
import { PairProgrammingController } from "../controller/admin/PairProgramming"




const router = express.Router()

const adminRepository: IAdminRepository = new AdminRepository()
const userRepository: IUserRepository = new UserRepository()
const problemRespository: IProblemRepository = new ProblemRepository()
const premiumPlanRepository: IpremiumPlanRepository = new PremiumPlanRepository()
const challengeRepository: ChallengeRepository = new ChallengeRepository()
const pairProgrammingRepository: IPairProgrammingRepository = new PairProgrammingRepository()
const reportRepository: IReportRepository = new ReportRepository()
const transactionRepository = new TransactionRespotitory()





const algorithm = new BcryptHashAlgorithm()     // dip for hashServices
const hashService: IHashAlgorithm = new HashService(algorithm)




const accessToken = env.ACCESS_JWT_TOKEN
const refreshToken = env.REFRESH_JWT_TOKEN
const jwtService = new JwtService(accessToken, refreshToken)



const addProblemUseCase: IAddProblemUseCase = new AddProblemUseCase(problemRespository)
const editProblemUseCase = new EditProblemUseCase(problemRespository)
const getFilteredUsersUseCase = new GetFilteredUsersUseCase(userRepository)
const adminDashBoardUseCase = new AdminDashBoardUseCase(userRepository, transactionRepository)
const getAllReportsUsecase = new GetAllReportsUsecase(reportRepository)
const updateUserUseCase = new UpdateUserUseCase(userRepository)
const loginAdminUsecase = new LoginAdminUsecase(adminRepository, hashService, jwtService)
const editPlanUseCase = new EditPlanUseCase(premiumPlanRepository)




const getAdminRepoDataUseCase = new GetRepositoryDataUseCase<Admin>(adminRepository)
const getchallengeRepoDataUseCase = new GetRepositoryDataUseCase<GroupChallenge>(challengeRepository)
const getPaiProgarmmingRepoDataUseCase = new GetRepositoryDataUseCase<PairProgramming>(pairProgrammingRepository)
const changeRespoStatusUseCase = new ChangeRespoStatusUseCase(reportRepository)
const createPremiumRepoUseCase = new CreateRepoUseCase(premiumPlanRepository)
const getPremiumDataUseCase = new GetRepositoryDataUseCase(premiumPlanRepository)
const changechallegeStatusUSeCase=new ChangeRespoStatusUseCase(challengeRepository)
const changePairProgramStatusUSeCase=new ChangeRespoStatusUseCase(pairProgrammingRepository)






// const addProblemUseCase=new AddProblemUseCase(problemRespository)


const adminAuthController = new AdminAuthController(loginAdminUsecase)
const usersListController = new UsersListController(getFilteredUsersUseCase, updateUserUseCase)
const adminProblemController = new AdminProblemController(addProblemUseCase, editProblemUseCase)
const adminPremiumPlanController = new AdminPremiumPlanController(createPremiumRepoUseCase,getPremiumDataUseCase,editPlanUseCase)
const challengeController = new ChallengeController(getchallengeRepoDataUseCase ,changechallegeStatusUSeCase)
const dashboardController = new DashboardBoardController(adminDashBoardUseCase)
const adminReportController = new AdminReportController<Report>(getAllReportsUsecase, changeRespoStatusUseCase)
const pairProgrammingController=new PairProgrammingController(getPaiProgarmmingRepoDataUseCase,changePairProgramStatusUSeCase)



let authenticate = new Authenticate(jwtService, getAdminRepoDataUseCase)
let authorize = new RoleMiddleware()
let auth = new AuthMiddlwareBundler(authenticate, authorize, "admin")

router.post("/login", adminAuthController.login)
router.post("/logout", adminAuthController.logout)
router.get("/users", auth.verify(), usersListController.getData)
router.patch("/users/:email", auth.verify(), usersListController.updateUser);
router.post("/addProblem", auth.verify(), adminProblemController.addProblem);
router.post("/editProblem", auth.verify(), adminProblemController.editProblem);
router.post("/createPremiumPlan", auth.verify(), adminPremiumPlanController.createNewPlan)
router.get("/adminAllPlans", auth.verify(), adminPremiumPlanController.getPlans)
router.post("/editPremiumPlan", auth.verify(), adminPremiumPlanController.editPlan)


router.get("/getAllGroupChallenges", auth.verify(), challengeController.allGroupChallenges)
router.get("/getAllPairProgramming", auth.verify(), pairProgrammingController.getAllPairProgramming)
router.get("/dashboard", auth.verify(), dashboardController.getAllDashBoardData)

router.
      route("/report")
      .get(auth.verify(), adminReportController.getAllreports)
      .patch(auth.verify(), adminReportController.updateReportStatus)

router.patch("/challengeChangeStatus",auth.verify(),challengeController.changeStatus)
router.patch("/changeStatusPairProgarm",auth.verify(),pairProgrammingController.changeStatus)






export default router