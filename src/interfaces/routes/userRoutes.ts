import express from "express";
import { AuthController } from "../controller/user/AuthController"; 
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
import { VerifyOtpController } from "../controller/user/VerifyOtpController";
import { ResendOtpController } from "../controller/user/ResendOtpController";
import passport from "passport";
import { LogoutController } from "../controller/user/LogoutController";
import { GoogleAuthController } from "../controller/user/GoogleAuthController"; 
import { ForgotPassVerifyOtpController } from "../controller/user/ForgotPassVerifyOtpContoller"; 
import { ForgotPasswordOtpController } from "../controller/user/ForgotPassOtpController"; 
import { ResetPasswordContoller } from "../controller/user/resetPasswordController";
import { ProblemController } from "../controller/user/ProblemContoller"; 
import { IProblemRepository } from "../../domain/repositories/IProblemRepository";
import { ProblemRepository } from "../../infrastructure/repositories/ProblemRepository";
import { Authenticate } from "../../middlewares/Authenticate";
import { ProfileController } from "../controller/user/ProfileController";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";
import { GetRepositoryDataUseCase } from "../../application/use-cases/GetRepositoryDataUseCase";

import { VerifyUserPasswordUseCase } from "../../application/use-cases/VerifyUserPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/use-cases/ResetPasswordUsecase";
import { ArenaController } from "../controller/user/ArenaController"; 
import { Problem } from "../../domain/entities/Problem";
import { User } from "../../domain/entities/User";
import { RunProblemUseCase } from "../../application/use-cases/RunProblemUseCase";
import Juge0CodeExecute from "../../services/Judg0/Juge0CodeExecute";
import { SubmitProblemUseCase } from "../../application/use-cases/SubmitProblemUseCase";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository";
import { SubmissionRepository } from "../../infrastructure/repositories/SubmissionRepository";
import { SubmissionController } from "../controller/user/SubmissionController";
import { GetAllSubmissionByProblemuseCase } from "@/application/use-cases/GetAllSubmissionByProblemuseCase"; 
import { CreateChallengeUseCase } from "../../application/use-cases/CreateChallengeUseCase";
import { ChallengeRepository } from "../../infrastructure/repositories/ChallengeRespository";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository";
import { JoinChallengeUseCase } from "../../application/use-cases/JoinChallengeUseCase";
import { ILeaderBoardRepository } from "../../domain/repositories/ILeaderBoardRepository";
import { LeaderBoardRepository } from "../../infrastructure/repositories/LeaderBoardRepository";
import { PairProgrammingRepository } from "../../infrastructure/repositories/PairProgrammingRepsitory";
import { CreatePairProgrammingUseCase } from "../../application/use-cases/CreatePairProgrammingUseCase";
import { IGroupChallenge, IPairProgramming } from "../../application/interfaces/IChallengeInterfaces";
import { UsersController } from "../controller/user/UsersController";
import { InterviewController } from "../controller/user/InterviewController";
import { CreateRepoUseCase } from "../../application/use-cases/CreateRepoUseCase";
import { InterViewRepository } from "../../infrastructure/repositories/InterviewRepostory";
import { ScheduleInterviewUseCase } from "../../application/use-cases/ScheduleInterviewUseCase";
import { GetFilteredUsersUseCase } from "../../application/use-cases/GetFilteredUsers";
import { joinInterViewUseCase } from "../../application/use-cases/JoinInterviewUsecase";
import { StreakService } from "../../services/streak/Streak";
import { SubscriptionController } from "../controller/user/SubscriptionController";
import { PremiumPlanRepository } from "../../infrastructure/repositories/premiumPlanRepostiroy";
import { PremiumPlan } from "@/domain/entities/PremiumPlan";
import { PaymentUseCases } from "../../application/use-cases/PaymentUseCases";
import { RazorpayServices } from "../../services/razorpay/RazorpayServices";
import { PaymentController } from "../controller/user/PaymentController";
import { TransactionRespotitory } from "@/infrastructure/repositories/TransactionsRespositoy";
import { SubscritpionRepository } from "@/infrastructure/repositories/SubscritpionRepository";
import { RoleMiddleware } from "@/middlewares/RoleMiddleware";
import { AuthMiddlwareBundler } from "@/middlewares/AuthMiddlwareBundler";
import { ReportController } from "../controller/user/ReportController";
import { ReportRepository } from "@/infrastructure/repositories/ReportRepository";
import { GetUserDataBynameUseCase } from "@/application/use-cases/GetUserDataBynameUseCase"; 
import { LoginUserUseCase } from "@/application/use-cases/LoginUserUseCase";
import { CreateUserUseCase } from "@/application/use-cases/CreateUserUseCase";
import { SendOtpUseCase } from "@/application/use-cases/SendOtpUseCase";
import { ResetPassswordOtpUseCase } from "@/application/use-cases/ResetPasswordOtpUseCase";
import { ResetPassverifyOtpUseCase } from "@/application/use-cases/ResetPassverifyOtpUseCase";
import { GoogleUserUseCase } from "@/application/use-cases/GoogleUserUseCase";
import { VerifyOtpUseCase } from "@/application/use-cases/VerifyUsecase";
import { RegisterUserFromPendingUseCase } from "@/application/use-cases/RegisterUserFromPendingUseCase ";
import { SubscriptionEntity } from "@/domain/entities/Subscription";
import { ActivePrivateChallengeUsecase } from "@/application/use-cases/ActivePrivateChallengeUsecase";
import { ActivePublicChallengeUsecase } from "@/application/use-cases/ActivePublicChallengeUsecase";



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
      const transactionRepository=new TransactionRespotitory()
      const subscritpionRepository=new SubscritpionRepository()
      const reportRepository=new ReportRepository()


      
      const accessToken=env.ACCESS_JWT_TOKEN
      const refreshToken=env.REFRESH_JWT_TOKEN
      const razorpay_key=env.RAZORPAY_KEY
      const razorpay_secret=env.RAZORPAY_SECRET



      const jwtService=new JwtService(accessToken,refreshToken)
      const otpService=new OtpService(env.EMAIL,env.NODEMAILER_PASS)
      const juge0CodeExecuteService=new Juge0CodeExecute()
      const streakService=new StreakService(userRepository)
      const razorpayService=new RazorpayServices(razorpay_key,razorpay_secret)



      const updateUserUseCase=new UpdateUserUseCase(userRepository)


      // REUSABLE USECASES - GetRepositoryDataUseCase
      const getUserRepositoryDataUseCase=new GetRepositoryDataUseCase<User>(userRepository)
      const getProblemDataUseCase=new GetRepositoryDataUseCase<Problem>(problemRespository)
      const getPremiumPlanUseCase=new GetRepositoryDataUseCase<PremiumPlan>(premiumPlanRepository)
      const getSubcriptionUseCase=new GetRepositoryDataUseCase<SubscriptionEntity>(subscritpionRepository)


      const verifyUserPasswordUseCase=new VerifyUserPasswordUseCase(userRepository,hashService)
      const resetPasswordUseCase=new ResetPasswordUseCase(userRepository,hashService)
      const runProblemUseCase=new RunProblemUseCase(juge0CodeExecuteService)
      const submitProblemUseCase=new SubmitProblemUseCase(submissionRespository,streakService)
      const getAllSubmissionByProblemuseCase=new GetAllSubmissionByProblemuseCase(submissionRespository)
      const createChallengeUseCase=new CreateChallengeUseCase(challengeRepository)
      const joinChallengeUseCase=new JoinChallengeUseCase<IGroupChallenge>(challengeRepository,leaderBoardRespository)
      const createPairProgrammingUseCase=new CreatePairProgrammingUseCase(pairProgrammingRepository,problemRespository)
      const joinPairProgarmmingUseCase=new JoinChallengeUseCase<IPairProgramming>(challengeRepository,leaderBoardRespository)
      const scheduleInterviewUsecase=new ScheduleInterviewUseCase(userRepository)
      const joiinInterviewUsecase=new joinInterViewUseCase(interViewRespository)
      const paymentUseCases=new PaymentUseCases(razorpayService,transactionRepository)
      const getUserDataBynameUseCase=new GetUserDataBynameUseCase(userRepository)
      const loginUserUseCase = new LoginUserUseCase(userRepository,hashService,jwtService)
      const createUserUseCase = new CreateUserUseCase(userRepository,hashService,pendingUserRepository);
      const sendOtpUseCase = new SendOtpUseCase(otpService,pendingUserRepository)
      const resetPassswordOtpUseCase=new ResetPassswordOtpUseCase(otpService,pendingUserRepository,userRepository)
      const resetPassverifyOtpUseCase=new  ResetPassverifyOtpUseCase(pendingUserRepository)
      const googleUserUseCase=new GoogleUserUseCase(userRepository,hashService,jwtService)
      const verifyOtpUseCase = new VerifyOtpUseCase(pendingUserRepository,otpService);
      const registerUserFromPendingUseCase=new RegisterUserFromPendingUseCase(pendingUserRepository,userRepository)
      const activePrivateChallengeUsecase=new ActivePrivateChallengeUsecase(challengeRepository)
      const activePublicChallengeUsecase=new ActivePublicChallengeUsecase(challengeRepository)



   
      
      
      

      
      // COMMON USECASES
      const getFilteredUsersUseCase=new GetFilteredUsersUseCase(userRepository)
      
      
      const createRepoUseCase=new CreateRepoUseCase(interViewRespository)
      const createSubscritionUseCase=new CreateRepoUseCase(subscritpionRepository)
      const createResportUseCase=new CreateRepoUseCase(reportRepository)

      
      



     

      
      const authController= new AuthController(createUserUseCase,sendOtpUseCase,loginUserUseCase)
      const verifyOtpController=new VerifyOtpController(verifyOtpUseCase,registerUserFromPendingUseCase)
      const resendOtpController=new ResendOtpController(sendOtpUseCase)
      const logoutController=new LogoutController()
      const googleAuthController=new GoogleAuthController(googleUserUseCase)
      const forgotPasswordVerify=new ForgotPassVerifyOtpController(resetPassverifyOtpUseCase)
      const resetPassword=new ResetPasswordContoller(resetPasswordUseCase)
      const forgotPasswordOtpController=new ForgotPasswordOtpController(resetPassswordOtpUseCase)
      const problemController=new ProblemController(problemRespository,runProblemUseCase,getProblemDataUseCase,submitProblemUseCase)
      const profileController=new ProfileController(updateUserUseCase,getUserRepositoryDataUseCase,verifyUserPasswordUseCase,resetPasswordUseCase)
      const arenaController=new ArenaController(createChallengeUseCase,joinChallengeUseCase,createPairProgrammingUseCase,joinPairProgarmmingUseCase,activePrivateChallengeUsecase,activePublicChallengeUsecase)
      const submissionController=new SubmissionController(getAllSubmissionByProblemuseCase)
      const usersController=new UsersController(getFilteredUsersUseCase)
      const interviewController=new InterviewController(createRepoUseCase,scheduleInterviewUsecase,interViewRespository,joiinInterviewUsecase)
      const subscriptionController=new SubscriptionController(getPremiumPlanUseCase,createSubscritionUseCase,updateUserUseCase,getSubcriptionUseCase,getUserRepositoryDataUseCase)
      const paymentController=new PaymentController(paymentUseCases,getPremiumPlanUseCase)
      const reportController=new ReportController(createResportUseCase,getUserDataBynameUseCase)
 


       //MIDDLEWARE--FOR AUTHENCATION AND AUTHORIZE
       let authenticate=new Authenticate(jwtService,getUserRepositoryDataUseCase)
       let authorize=new RoleMiddleware()
       let auth=new AuthMiddlwareBundler(authenticate,authorize,"user")



      const router=express.Router()



router.post("/register",authController.register)      //auth.verify
router.post("/login",authController.login)
router.post("/verifyOtp",verifyOtpController.verify)
router.post("/resendOtp",resendOtpController.resend)

router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))


router.get("/auth/google/callback",passport.authenticate("google",{
      failureRedirect:"/Login",session:true
}),(req,res,next)=>googleAuthController.handleSuccess(req,res,next))

router.post("/logout",logoutController.logout)
router.post("/forgotPasswordOtp",forgotPasswordOtpController.sendOtp)

router.post("/forgotPasswordVerify",forgotPasswordVerify.verify)
router.post("/resetPassword",resetPassword.reset)
router.get("/problems",problemController.getData)
router.get("/problemDetails",problemController.problemDetails)


//USERS
router.get("/users",auth.verify(),usersController.getData)

router.patch("/profile",auth.verify(),profileController.update)
router.get("/profile",auth.verify(),profileController.getData)
router.patch("/profile/resetPassword",auth.verify(),profileController.resetPassword)



router.post("/problem/run",auth.verify(),problemController.runProblem)
router.post("/problem/submit",auth.verify(),problemController.submitProblem)

router.get("/submissions",auth.verify(),submissionController.getSubmissionData)


router.post("/arena/createGroupChallenge",auth.verify(),arenaController.createGroupChallenge)
router.post("/joinGroupChallenge",auth.verify(),arenaController.joinGroupChallenge)
router.get("/activeChallenges",auth.verify(),arenaController.activeChallenges)



router.post("/createPairProgramming",auth.verify(),arenaController.createPairProgramming)
router.post("/joinPairProgramming",auth.verify(),arenaController.joinPairProgramming)

//INTERVIEW
router.post("/scheduleInterview",auth.verify(),interviewController.schedule)
router.get("/getUserInteviews",auth.verify(),interviewController.getUserInterviews)
router.post("/joinInterView",auth.verify(),interviewController.joinInterview)

//PREMIUM
router.get("/allPlans",subscriptionController.getPlans)
router.get("/subscriptionData",auth.verify(),subscriptionController.getSubcriptionData)

//PAYMENT 
router.post("/createPayment",paymentController.createPayment)
//SUBSCRIBE PLAN IF VERIFEID PAYMENT
router.post("/verifyPayment",auth.verify(),paymentController.verifyPayment,subscriptionController.createSubscription)



//REPORT
router
.route("/report")
.post(auth.verify(),reportController.createReport)






export default router 