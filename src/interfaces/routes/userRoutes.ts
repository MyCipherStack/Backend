import express from "express";
import { AuthController } from "../controller/AuthController.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { UserRepository } from "../../infrastructure/repositories/UserRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { HashService } from "../../services/hashing/HashService.js";
import { BcryptHashAlgorithm } from "../../services/hashing/BcryptHashAlgorithm.js";
import { JwtService } from "../../services/jwt/JwtService.js";
import { env } from "../../config/env.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { PendingUserRepository } from "../../infrastructure/repositories/PendingUserRepository.js";
import { OtpService } from "../../services/otp/OtpService.js";
import { VerifyOtpController } from "../controller/VerifyOtpController.js";
import { ResendOtpController } from "../controller/ResendOtpController.js";
import passport from "passport";
import { LogoutController } from "../controller/LogoutController.js";
import { GoogleAuthController } from "../controller/GoogleAuthController.js";
import {ForgotPassVerifyOtpController } from "../controller/ForgotPassVerifyOtpContoller.js";
import { ForgotPasswordOtpController } from "../controller/ForgotPassOtpController.js";
import { ResetPasswordContoller } from "../controller/resetPasswordController.js";
import { ProblemController } from "../controller/ProblemContoller.js";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";
import { ProblemRepository } from "../../infrastructure/repositories/ProblemRepository.js";
import { Authenticate } from "../../middlewares/Authenticate.js";
import { ProfileController } from "../controller/ProfileController.js";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase.js";
import { GetRepositoryDataUseCase } from "../../application/use-cases/GetRepositoryDataUseCase.js";

import { VerifyUserPasswordUseCase } from "../../application/use-cases/VerifyUserPasswordUseCase.js";
import { ResetPasswordUseCase } from "../../application/use-cases/ResetPasswordUsecase.js";
import { ArenaController } from "../controller/ArenaController.js";
import { Problem } from "../../domain/entities/Problem.js";
import { User } from "../../domain/entities/User.js";
import { RunProblemUseCase } from "../../application/use-cases/RunProblemUseCase.js";
import Juge0CodeExecute from "../../services/Judg0/Juge0CodeExecute.js";
import { SubmitProblemUseCase } from "../../application/use-cases/SubmitProblemUseCase.js";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository.js";
import { SubmissionRepository } from "../../infrastructure/repositories/SubmissionRepository.js";
import { SubmissionController } from "../controller/SubmissionController.js";
import { GetAllSubmissionByProblemuseCase } from "../../application/use-cases/getAllSubmissionByProblemuseCase.js";
import { CreateChallengeUseCase } from "../../application/use-cases/CreateChallengeUseCase.js";
import { ChallengeRepository } from "../../infrastructure/repositories/ChallengeRespository.js";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository.js";
import { JoinChallengeUseCase } from "../../application/use-cases/JoinChallengeUseCase.js";
import { ILeaderBoardRepository } from "../../domain/repositories/ILeaderBoardRepository.js";
import { LeaderBoardRepository } from "../../infrastructure/repositories/LeaderBoardRepository.js";
import { PairProgrammingRepository } from "../../infrastructure/repositories/PairProgrammingRepsitory.js";
import { CreatePairProgrammingUseCase } from "../../application/use-cases/CreatePairProgrammingUseCase.js";
import { IGroupChallenge, IPairProgramming } from "../../application/interfaces/IChallengeInterfaces.js";
import { UsersController } from "../controller/UsersController.js";
import { InterviewController } from "../controller/InterviewController.js";
import { CreateRepoUseCase } from "../../application/use-cases/CreateRepoUseCase.js";
import { InterViewRepository } from "../../infrastructure/repositories/InterviewRepostory.js";
import { ScheduleInterviewUseCase } from "../../application/use-cases/ScheduleInterviewUseCase.js";
import { GetFilteredUsersUseCase } from "../../application/use-cases/GetFilteredUsers.js";
import { joinInterViewUseCase } from "../../application/use-cases/JoinInterviewUsecase.js";
import { StreakService } from "../../services/streak/Streak.js";
import { PremiumController } from "../controller/PremiumController.js";
import { PremiumPlanRepository } from "../../infrastructure/repositories/premiumPlanRepostiroy.js";



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
      const getRepositoryDataUseCase=new GetRepositoryDataUseCase<User>(userRepository)
      const verifyUserPasswordUseCase=new VerifyUserPasswordUseCase(userRepository,hashService)
      const resetPasswordUseCase=new ResetPasswordUseCase(userRepository,hashService)
      const getProblemDataUseCase=new GetRepositoryDataUseCase<Problem>(problemRespository)
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
      const premiumController=new PremiumController(premiumPlanRepository)
 

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
router.get("/getAllPlans",premiumController.getPlans)


export default router