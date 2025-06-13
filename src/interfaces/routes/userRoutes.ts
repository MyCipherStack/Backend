import express from "express";
import { AuthController } from "../controller/AuthController";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm";
import { HashService } from "../../services/hashing/HashService";
import { BcryptHashAlgorithm } from "../../services/hashing/BcryptHashAlgorithm";
import { JwtService } from "../../services/jwt/JwtService";
import { env } from "../../config/env";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository";
import { PendingUserRepository } from "../../infrastructure/repositories/PendingUserRepository";
import { OtpService } from "../../services/otp/OtpService";
import { VerifyOtpController } from "../controller/VerifyOtpController";
import { ResendOtpController } from "../controller/ResendOtpController";
import passport from "passport";
import { LogoutController } from "../controller/LogoutController";
import { GoogleAuthController } from "../controller/GoogleAuthController";
import {ForgotPassVerifyOtpController } from "../controller/ForgotPassVerifyOtpContoller";
import { ForgotPasswordOtpController } from "../controller/ForgotPassOtpController";
import { ResetPasswordContoller } from "../controller/resetPasswordController";
import { ProblemController } from "../controller/ProblemContoller";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository";
import { ProblemRepository } from "../../infrastructure/repositories/ProblemRepository";
import { Authenticate } from "../../middlewares/Authenticate";
import { ProfileController } from "../controller/ProfileController";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";
import { GetRepositoryDataUseCase } from "../../application/use-cases/GetRepositoryDataUseCase";

import { VerifyUserPasswordUseCase } from "../../application/use-cases/VerifyUserPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/use-cases/ResetPasswordUsecase";
import { ArenaController } from "../controller/ArenaController";
import { Problem } from "../../domain/entities/Problem";
import { User } from "../../domain/entities/User";
import { RunProblemUseCase } from "../../application/use-cases/RunProblemUseCase";
import Juge0CodeExecute from "../../services/Judg0/Juge0CodeExecute";
import { SubmitProblemUseCase } from "../../application/use-cases/SubmitProblemUseCase";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository";
import { SubmissionRepository } from "../../infrastructure/repositories/SubmissionRepository";
import { SubmissionController } from "../controller/SubmissionController";
import { GetAllSubmissionByProblemuseCase } from "../../application/use-cases/getAllSubmissionByProblemuseCase";
import { CreateChallengeUseCase } from "../../application/use-cases/CreateChallengeUseCase";
import { ChallengeRepository } from "../../infrastructure/repositories/ChallengeRespository";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository";
import { JoinChallengeUseCase } from "../../application/use-cases/JoinChallengeUseCase";
import { ILeaderBoardRepository } from "../../domain/repositories/ILeaderBoardRepository";
import { LeaderBoardRepository } from "../../infrastructure/repositories/LeaderBoardRepository";
import { PairProgrammingRepository } from "../../infrastructure/repositories/PairProgrammingRepsitory";
import { CreatePairProgrammingUseCase } from "../../application/use-cases/CreatePairProgrammingUseCase";
import { IGroupChallenge, IPairProgramming } from "../../application/interfaces/IChallengeInterfaces";
import { UsersController } from "../controller/UsersController";
import { InterviewController } from "../controller/InterviewController";
import { CreateRepoUseCase } from "../../application/use-cases/CreateRepoUseCase";
import { InterViewRepository } from "../../infrastructure/repositories/InterviewRepostory";
import { ScheduleInterviewUseCase } from "../../application/use-cases/ScheduleInterviewUseCase";
import { GetFilteredUsersUseCase } from "../../application/use-cases/GetFilteredUsers";
import { joinInterViewUseCase } from "../../application/use-cases/JoinInterviewUsecase";
import { StreakService } from "../../services/streak/Streak";
import { PremiumController } from "../controller/PremiumController";
import { PremiumPlanRepository } from "../../infrastructure/repositories/premiumPlanRepostiroy";
import { PremiumPlan } from "@/domain/entities/PremiumPlan";



      export const userRepository:IUserRepository=new UserRepository()
      const algorithm=new BcryptHashAlgorithm()     // dip for hashServices
      const hashService:IHashAlgorithm=new HashService(algorithm)
      const pendingUserRepository:IPendingUserRepository=new PendingUserRepository()
      const problemRespository:IProblemRepository=new ProblemRepository()
      const submissionRespository:ISubmissionRepository=new SubmissionRepository()
      const challengeRepository:IChallengeRepository=new ChallengeRepository()
      const leaderBoardRespository:ILeaderBoardRepository=new LeaderBoardRepository()
      const pairProgrammingRepository=new PairProgrammingRepository()
      const interViewRespository=new InterViewRepository()
      const premiumPlanRepository=new PremiumPlanRepository()


      
      const accessToken=env.ACCESS_JWT_TOKEN
      const refreshToken=env.REFRESH_JWT_TOKEN
      const jwtService=new JwtService(accessToken,refreshToken)
      const otpService=new OtpService(env.EMAIL,env.NODEMAILER_PASS)
      const juge0CodeExecuteService=new Juge0CodeExecute()
      const streakService=new StreakService(userRepository)



      const updateUserUseCase=new UpdateUserUseCase(userRepository)

      // REUSABLE USECASES - GetRepositoryDataUseCase
      const getRepositoryDataUseCase=new GetRepositoryDataUseCase<User>(userRepository)
      const getProblemDataUseCase=new GetRepositoryDataUseCase<Problem>(problemRespository)
      const getPremiumPlanUseCase=new GetRepositoryDataUseCase<PremiumPlan>(premiumPlanRepository)


      const verifyUserPasswordUseCase=new VerifyUserPasswordUseCase(userRepository,hashService)
      const resetPasswordUseCase=new ResetPasswordUseCase(userRepository,hashService)
      const runProblemUseCase=new RunProblemUseCase(juge0CodeExecuteService)
      const submitProblemUseCase=new SubmitProblemUseCase(submissionRespository,streakService)
      const getAllSubmissionByProblemuseCase=new GetAllSubmissionByProblemuseCase(submissionRespository)
      const createChallengeUseCase=new CreateChallengeUseCase(challengeRepository)
      const joinChallengeUseCase=new JoinChallengeUseCase<IGroupChallenge>(challengeRepository,leaderBoardRespository)
      const createPairProgrammingUseCase=new CreatePairProgrammingUseCase(pairProgrammingRepository)
      const joinPairProgarmmingUseCase=new JoinChallengeUseCase<IPairProgramming>(pairProgrammingRepository,leaderBoardRespository)
      const scheduleInterviewUsecase=new ScheduleInterviewUseCase(userRepository)
      const joiinInterviewUsecase=new joinInterViewUseCase(interViewRespository)
      
      // COMMON USECASES
      const getFilteredUsersUseCase=new GetFilteredUsersUseCase(userRepository)
      
      
      const createRepoUseCase=new CreateRepoUseCase(interViewRespository)

      
      let auth=new Authenticate(jwtService,userRepository)
      
      const authController= new AuthController(userRepository,hashService,jwtService,otpService,pendingUserRepository)
      const verifyOtpController=new VerifyOtpController(otpService,pendingUserRepository,userRepository)
      const resendOtpController=new ResendOtpController(otpService,pendingUserRepository)
      const logoutController=new LogoutController()
      const googleAuthController=new GoogleAuthController(userRepository,hashService,jwtService)
      const forgotPasswordVerify=new ForgotPassVerifyOtpController(pendingUserRepository,hashService)
      const resetPassword=new ResetPasswordContoller(userRepository,hashService)
      const forgotPasswordOtpController=new ForgotPasswordOtpController(otpService,jwtService,hashService,pendingUserRepository,userRepository)
      const problemController=new ProblemController(problemRespository,runProblemUseCase,getProblemDataUseCase,submitProblemUseCase)
      const profileController=new ProfileController(updateUserUseCase,getRepositoryDataUseCase,userRepository,verifyUserPasswordUseCase,resetPasswordUseCase)
      const arenaController=new ArenaController(createChallengeUseCase,joinChallengeUseCase,createPairProgrammingUseCase,joinPairProgarmmingUseCase)
      const submissionController=new SubmissionController(getAllSubmissionByProblemuseCase)
      const usersController=new UsersController(getFilteredUsersUseCase)
      const interviewController=new InterviewController(createRepoUseCase,scheduleInterviewUsecase,interViewRespository,joiinInterviewUsecase)
      const premiumController=new PremiumController(getPremiumPlanUseCase)
 

const router=express.Router()



router.post("/register",authController.register)      //auth.verify
router.post("/login",authController.login)
router.post("/verifyOtp",verifyOtpController.verify)
router.post("/resendOtp",resendOtpController.resend)

router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))


router.get("/auth/google/callback",passport.authenticate("google",{
      failureRedirect:"/Login",session:true
}),(req,res)=>googleAuthController.handleSuccess(req,res))

router.post("/logout",logoutController.logout)
router.post("/forgotPasswordOtp",forgotPasswordOtpController.sendOtp)

router.post("/forgotPasswordVerify",forgotPasswordVerify.verify)
router.post("/resetPassword",resetPassword.reset)
router.get("/problems",problemController.getData)


//USERS
router.get("/users",auth.verify,usersController.getData)

router.patch("/profile",auth.verify,profileController.update)
router.get("/profile",auth.verify,profileController.getData)
router.patch("/profile/resetPassword",auth.verify,profileController.resetPassword)


router.post("/problem/run",auth.verify,problemController.runProblem)
router.post("/problem/submit",auth.verify,problemController.submitProblem)

router.get("/submissions",auth.verify,submissionController.getSubmissionData)


router.post("/arena/createGroupChallenge",auth.verify,arenaController.createGroupChallenge)
router.post("/joinGroupChallenge",auth.verify,arenaController.joinGroupChallenge)


router.post("/createPairProgramming",auth.verify,arenaController.createPairProgramming)
router.post("/joinPairProgramming",auth.verify,arenaController.joinPairProgramming)

//INTERVIEW
router.post("/scheduleInterview",auth.verify,interviewController.schedule)
router.get("/getUserInteviews",auth.verify,interviewController.getUserInterviews)
router.post("/joinInterView",auth.verify,interviewController.joinInterview)

//PREMIUM
router.get("/allPlans",premiumController.getPlans)
router.post("/subscribePlan",premiumController.subscribePlan)




export default router