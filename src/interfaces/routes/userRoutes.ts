import express from 'express';
import passport from 'passport';
import { AuthController } from '../controller/user/AuthController';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { IHashAlgorithm } from '../../domain/services/IHashAlgorithm';
import { HashService } from '../../services/hashing/HashService';
import { BcryptHashAlgorithm } from '../../services/hashing/BcryptHashAlgorithm';
import { JwtService } from '../../services/jwt/JwtService';
import { env } from '@/config/env';
import { IPendingUserRepository } from '../../domain/repositories/IPendingUserRepository';
import { PendingUserRepository } from '../../infrastructure/repositories/PendingUserRepository';
import { OtpService } from '../../services/otp/OtpService';
import { VerifyOtpController } from '../controller/user/VerifyOtpController';
import { ResendOtpController } from '../controller/user/ResendOtpController';
import { LogoutController } from '../controller/user/LogoutController';
import { GoogleAuthController } from '../controller/user/GoogleAuthController';
import { ForgotPasswordOtpController } from '../controller/user/ForgotPassOtpController';
import { ResetPasswordController } from '../controller/user/resetPasswordController';
import { ProblemController } from '../controller/user/ProblemController';
import { IProblemRepository } from '../../domain/repositories/IProblemRepository';
import { ProblemRepository } from '../../infrastructure/repositories/ProblemRepository';
import { Authenticate } from '../../middlewares/Authenticate';
import { ProfileController } from '../controller/user/ProfileController';
import { UpdateUserUseCase } from '@/application/use-cases/user/user-mangement/UpdateUserUseCase';
import { GetRepositoryDataUseCase } from '@/application/use-cases/shared/GetRepositoryDataUseCase';
import { VerifyUserPasswordUseCase } from '@/application/use-cases/user/auth/VerifyUserPasswordUseCase';
import { ResetPasswordUseCase } from '@/application/use-cases/user/auth/ResetPasswordUseCase';
import { ArenaController } from '../controller/user/ArenaController';
import { Problem } from '../../domain/entities/Problem';
import { User } from '../../domain/entities/User';
import { RunProblemUseCase } from '@/application/use-cases/user/problem-mangement/RunProblemUseCase';
import Juge0CodeExecute from '../../services/Judg0/Juge0CodeExecute';
import { SubmitProblemUseCase } from '@/application/use-cases/user/problem-mangement/SubmitProblemUseCase';
import { ISubmissionRepository } from '../../domain/repositories/ISubmissionRepository';
import { SubmissionRepository } from '../../infrastructure/repositories/SubmissionRepository';
import { SubmissionController } from '../controller/user/SubmissionController';
import { GetAllSubmissionByProblemuseCase } from '@/application/use-cases/user/problem-mangement/GetAllSubmissionByProblemuseCase';
import { CreateChallengeUseCase } from '@/application/use-cases/user/arena/CreateChallengeUseCase';
import { ChallengeRepository } from '@/infrastructure/repositories/ChallengeRepository';
import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';
import { JoinChallengeUseCase } from '../../application/use-cases/user/arena/JoinChallengeUseCase';
import { ILeaderBoardRepository } from '../../domain/repositories/ILeaderBoardRepository';
import { LeaderBoardRepository } from '../../infrastructure/repositories/LeaderBoardRepository';
import { PairProgrammingRepository } from '../../infrastructure/repositories/PairProgrammingRepository';
import { CreatePairProgrammingUseCase } from '@/application/use-cases/user/arena/CreatePairProgrammingUseCase';
import { UsersController } from '../controller/user/UsersController';
import { InterviewController } from '../controller/user/InterviewController';
import { CreateRepoUseCase } from '@/application/use-cases/shared/CreateRepoUseCase';
import { InterViewRepository } from '../../infrastructure/repositories/InterviewRepostory';
import { ScheduleInterviewUseCase } from '@/application/use-cases/user/arena/ScheduleInterviewUseCase';
import { GetFilteredUsersUseCase } from '@/application/use-cases/user/user-mangement/GetFilteredUsers';
import { joinInterViewUseCase } from '../../application/use-cases/user/arena/JoinInterviewUseCase';
import { StreakService } from '../../services/streak/Streak';
import { SubscriptionController } from '../controller/user/SubscriptionController';
import { PremiumPlanRepository } from '../../infrastructure/repositories/premiumPlanRepository';
import { PremiumPlan } from '@/domain/entities/PremiumPlan';
import { PaymentUseCases } from '@/application/use-cases/user/PaymentUseCases';
import { RazorpayServices } from '../../services/razorpay/RazorpayServices';
import { PaymentController } from '../controller/user/PaymentController';
import { TransactionRepository } from '@/infrastructure/repositories/TransactionsRepository';
import { RoleMiddleware } from '@/middlewares/RoleMiddleware';
import { AuthMiddlwareBundler } from '@/middlewares/AuthMiddlwareBundler';
import { ReportController } from '../controller/user/ReportController';
import { ReportRepository } from '@/infrastructure/repositories/ReportRepository';
import { LoginUserUseCase } from '@/application/use-cases/user/auth/LoginUserUseCase';
import { CreateUserUseCase } from '@/application/use-cases/user/user-mangement/CreateUserUseCase';
import { SendOtpUseCase } from '@/application/use-cases/user/auth/SendOtpUseCase';
import { ResetPasswordOtpUseCase } from '@/application/use-cases/user/auth/ResetPasswordOtpUseCase';
import { ResetPassverifyOtpUseCase } from '@/application/use-cases/user/auth/ResetPassverifyOtpUseCase';
import { VerifyOtpUseCase } from '@/application/use-cases/user/auth/VerifyUseCase';
import { RegisterUserFromPendingUseCase } from '@/application/use-cases/user/auth/RegisterUserFromPendingUseCase';
import { SubscriptionEntity } from '@/domain/entities/Subscription';
import { ActivePrivateChallengeUsecase } from '@/application/use-cases/user/arena/ActivePrivateChallengeUseCase';
import { ActivePublicChallengeUsecase } from '@/application/use-cases/user/arena/ActivePublicChallengeUseCase';
import { GoogleUserUseCase } from '@/application/use-cases/user/auth/GoogleUserUseCase';
import { JoinPairProgrammigUseCase } from '@/application/use-cases/user/arena/JoinPairProgrammigUseCase';
import { notificationSocket } from '@/services/websocket/NotificationSocket';
import { GetAllUsersSubmissionUseCase } from '@/application/use-cases/user/problem-mangement/GetAllUsersSubmissionUseCase';
import { NotificationRepository } from '@/infrastructure/repositories/NotificationRepository';
import { NotificationController } from '../controller/user/NotificationController';
import { UpdateRepositoryDataUseCase } from '@/application/use-cases/shared/UpdateRepositoryDataUseCase';
import { GetAllRepoDataUsingFieldUseCase } from '@/application/use-cases/shared/GetAllRepoDataUsingFieldUseCase';
import { EvaluateWinnerUsecase } from '@/application/use-cases/user/arena/EvaluateWinnerUsecase';
import { EndChallengeUseCase } from '@/application/use-cases/user/arena/EndChallengeUseCases';
import { BullmqQueueService } from '@/infrastructure/queue/bullmqHelper';
import { EvaluateWinnerWorker } from '@/infrastructure/queue/processors/evaluateWinnerProcessor';
import { GetRecentSubmissionUseCase } from '@/application/use-cases/user/problem-mangement/GetRecentSubmissionUseCase';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { ChallengeResultsUseCase } from '@/application/use-cases/user/arena/ChallengeResultsUseCase';
import { LeaderBoardUseCase } from '@/application/use-cases/user/arena/LeaderBoardUseCaset';
import { AcceptedUserProblemsUseCase } from '@/application/use-cases/user/problem-mangement/AcceptedUserProblemsUseCase';
import { SendToOllama } from '@/services/ollamaAi/SendToOllama';
import { GeneratePrompt } from '@/services/ollamaAi/GeneratePrompt';
import { SubscriptionRepository } from '@/infrastructure/repositories/SubscritpionRepository';
import { ForgotPassVerifyOtpController } from '../controller/user/ForgotPassVerifyOtpController';
import { RedisServices } from '@/services/redis/RedisServices';
import { UploadImageUseCase } from '@/application/use-cases/user/UploadImageUseCase';
import { UploadFileService } from '@/services/s3bucket/UploadService';
import multer from 'multer';
import { GetUserDataByNameUseCase } from '@/application/use-cases/user/user-mangement/GetUserDataBynameUseCase';
import { GetAllProblemUseCase } from '@/application/use-cases/user/problem-mangement/GetAllProblemUseCase';
import { verify } from 'crypto';
import { VerifyAccessTokenUseCase } from '@/application/use-cases/user/auth/VerifyTokenUseCase';
import { Interview } from '@/domain/entities/Interview';


export const userRepository: IUserRepository = new UserRepository();
const algorithm = new BcryptHashAlgorithm(); // dip for hashServices
const hashService: IHashAlgorithm = new HashService(algorithm);
const pendingUserRepository: IPendingUserRepository = new PendingUserRepository();
const problemRepository: IProblemRepository = new ProblemRepository();
const submissionRepository: ISubmissionRepository = new SubmissionRepository();
const challengeRepository: IChallengeRepository = new ChallengeRepository();
const leaderBoardRepository: ILeaderBoardRepository = new LeaderBoardRepository();
const pairProgrammingRepository = new PairProgrammingRepository();
const interViewRepository = new InterViewRepository();
const premiumPlanRepository = new PremiumPlanRepository();
const transactionRepository = new TransactionRepository();
const subscriptionRepository = new SubscriptionRepository();
const reportRepository = new ReportRepository();
const notificationRepository = new NotificationRepository();

const accessToken = env.ACCESS_JWT_TOKEN;
const refreshToken = env.REFRESH_JWT_TOKEN;
const razorpay_key = env.RAZORPAY_KEY;
const razorpay_secret = env.RAZORPAY_SECRET;

const jwtService = new JwtService(accessToken, refreshToken);
const otpService = new OtpService(env.EMAIL!, env.NODEMAILER_PASS!);
const juge0CodeExecuteService = new Juge0CodeExecute();
const streakService = new StreakService(userRepository);
const razorpayService = new RazorpayServices(razorpay_key, razorpay_secret);
const redisServices = new RedisServices()
const uploadFileService = new UploadFileService()

const updateUserUseCase = new UpdateUserUseCase(userRepository);

const verifyUserPasswordUseCase = new VerifyUserPasswordUseCase(userRepository, hashService);
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository, hashService);
const runProblemUseCase = new RunProblemUseCase(juge0CodeExecuteService);
const submitProblemUseCase = new SubmitProblemUseCase(submissionRepository, streakService, problemRepository);
const getAllSubmissionByProblemuseCase = new GetAllSubmissionByProblemuseCase(submissionRepository);
const createChallengeUseCase = new CreateChallengeUseCase(challengeRepository);
const joinChallengeUseCase = new JoinChallengeUseCase(challengeRepository, leaderBoardRepository);
const joinPairProgarmmingUseCase = new JoinPairProgrammigUseCase(pairProgrammingRepository);
const scheduleInterviewUsecase = new ScheduleInterviewUseCase(userRepository);
const joiinInterviewUsecase = new joinInterViewUseCase(interViewRepository);
const paymentUseCases = new PaymentUseCases(razorpayService, transactionRepository, redisServices);
const getUserDataByNameUseCase = new GetUserDataByNameUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository, hashService, jwtService);
const createUserUseCase = new CreateUserUseCase(userRepository, hashService, pendingUserRepository);
const sendOtpUseCase = new SendOtpUseCase(otpService, pendingUserRepository);
const resetPassswordOtpUseCase = new ResetPasswordOtpUseCase(otpService, pendingUserRepository, userRepository);
const resetPassverifyOtpUseCase = new ResetPassverifyOtpUseCase(pendingUserRepository);
const googleUserUseCase = new GoogleUserUseCase(userRepository, hashService, jwtService);
const verifyOtpUseCase = new VerifyOtpUseCase(pendingUserRepository, otpService);
const registerUserFromPendingUseCase = new RegisterUserFromPendingUseCase(pendingUserRepository, userRepository);
const activePrivateChallengeUsecase = new ActivePrivateChallengeUsecase(challengeRepository);
const activePublicChallengeUsecase = new ActivePublicChallengeUsecase(challengeRepository);
const getAllProblemUseCase = new GetAllProblemUseCase(problemRepository);

const createPairProgrammingUseCase = new CreatePairProgrammingUseCase(
  pairProgrammingRepository,
  problemRepository,
  notificationSocket,
  getUserDataByNameUseCase,
  notificationRepository,
);

const uploadImageUseCase = new UploadImageUseCase(uploadFileService)
const getAllUsersSubmissionUseCase = new GetAllUsersSubmissionUseCase(submissionRepository);
const challengeResultsUseCase = new ChallengeResultsUseCase(leaderBoardRepository);
const getRecentSubmissionUseCase = new GetRecentSubmissionUseCase(submissionRepository);
const leaderBoardUseCase = new LeaderBoardUseCase(leaderBoardRepository);
const acceptedUserProblems = new AcceptedUserProblemsUseCase(submissionRepository, problemRepository);

// REUSABLE USECASES - GetRepositoryDataUseCase
const getUserRepositoryDataUseCase = new GetRepositoryDataUseCase<User>(userRepository);
const getProblemDataUseCase = new GetRepositoryDataUseCase<Problem>(problemRepository);
const getPremiumPlanUseCase = new GetRepositoryDataUseCase<PremiumPlan>(premiumPlanRepository);
const getSubcriptionUseCase = new GetRepositoryDataUseCase<SubscriptionEntity>(subscriptionRepository);
const getChallengeDataUseCase = new GetRepositoryDataUseCase<GroupChallenge>(challengeRepository);
const verifyAccessTokenUseCase= new VerifyAccessTokenUseCase(jwtService,getUserRepositoryDataUseCase)

// COMMON USECASES
const getFilteredUsersUseCase = new GetFilteredUsersUseCase(userRepository);
const createRepoUseCase = new CreateRepoUseCase(interViewRepository);
const createSubscritionUseCase = new CreateRepoUseCase(subscriptionRepository);
const createResportUseCase = new CreateRepoUseCase(reportRepository);

const updateNotificationDataUseCase = new UpdateRepositoryDataUseCase(notificationRepository);
const getAllNotificaionDataUsingFieldUseCase = new GetAllRepoDataUsingFieldUseCase(notificationRepository);
const updateChallengeRepositoryDataUseCase = new UpdateRepositoryDataUseCase(challengeRepository);

const getAllInterviewDataUsingFieldUseCase = new GetAllRepoDataUsingFieldUseCase<Interview>(interViewRepository);
const getAllproblemUsingFieldUseCase = new GetAllRepoDataUsingFieldUseCase<Problem>(problemRepository);
// Bullmq-Queuing that leaderboard update after challenge time updated
const evaluateWinnerUsecase = new EvaluateWinnerUsecase(leaderBoardRepository, challengeRepository);
const evaluateWinnerWorker = new EvaluateWinnerWorker(evaluateWinnerUsecase);

// evaluateWinnerWorker.execute();

const bullmqQueueService = new BullmqQueueService();

const endChallengeUseCase = new EndChallengeUseCase(bullmqQueueService);

// OllamAi
const ollamaAi = new SendToOllama();
const generatePrompt = new GeneratePrompt();

const authController = new AuthController(createUserUseCase, sendOtpUseCase, loginUserUseCase);
const verifyOtpController = new VerifyOtpController(verifyOtpUseCase, registerUserFromPendingUseCase);
const resendOtpController = new ResendOtpController(sendOtpUseCase);
const logoutController = new LogoutController();
const googleAuthController = new GoogleAuthController(googleUserUseCase);
const forgotPasswordVerify = new ForgotPassVerifyOtpController(resetPassverifyOtpUseCase);
const resetPassword = new ResetPasswordController(resetPasswordUseCase);
const forgotPasswordOtpController = new ForgotPasswordOtpController(resetPassswordOtpUseCase);
const problemController = new ProblemController(getAllProblemUseCase, problemRepository, runProblemUseCase, acceptedUserProblems,verifyAccessTokenUseCase,getAllproblemUsingFieldUseCase generatePrompt, ollamaAi);
const profileController = new ProfileController(updateUserUseCase, getUserRepositoryDataUseCase, verifyUserPasswordUseCase, resetPasswordUseCase, uploadImageUseCase);
const arenaController = new ArenaController(
  createChallengeUseCase,
  joinChallengeUseCase,
  createPairProgrammingUseCase,
  joinPairProgarmmingUseCase,
  activePrivateChallengeUsecase,
  activePublicChallengeUsecase,
  getUserRepositoryDataUseCase,
  updateChallengeRepositoryDataUseCase,
  getChallengeDataUseCase,
  endChallengeUseCase,
  challengeResultsUseCase,
  leaderBoardUseCase,
);
const submissionController = new SubmissionController(
  getAllSubmissionByProblemuseCase,
  getAllUsersSubmissionUseCase,
  getRecentSubmissionUseCase,
  getProblemDataUseCase,
  submitProblemUseCase,
  runProblemUseCase,
);
const usersController = new UsersController(getFilteredUsersUseCase);
const interviewController = new InterviewController(createRepoUseCase, scheduleInterviewUsecase, joiinInterviewUsecase,getAllInterviewDataUsingFieldUseCase);
const subscriptionController = new SubscriptionController(getPremiumPlanUseCase, createSubscritionUseCase, updateUserUseCase, getSubcriptionUseCase, getUserRepositoryDataUseCase);
const paymentController = new PaymentController(paymentUseCases, getPremiumPlanUseCase);
const reportController = new ReportController(createResportUseCase, getUserDataByNameUseCase);
const notificationController = new NotificationController(updateNotificationDataUseCase, getAllNotificaionDataUsingFieldUseCase);

// Notification

// MIDDLEWARE--FOR AUTHENTICATION AND AUTHORIZE

// (this way we can create any number of role Authentication  and authorize)
const authenticate = new Authenticate(jwtService, getUserRepositoryDataUseCase);
const authorize = new RoleMiddleware();
const auth = new AuthMiddlwareBundler(authenticate, authorize, 'user');

const router = express.Router();




router.post('/register', authController.register); // auth.verify
router.post('/login', authController.login);
router.post('/verifyOtp', verifyOtpController.verify);
router.post('/resendOtp', resendOtpController.resend);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/Login', session: false,
}), (req, res, next) => googleAuthController.handleSuccess(req, res, next));

router.post('/logout', logoutController.logout);
router.post('/forgotPasswordOtp', forgotPasswordOtpController.sendOtp);
router.post('/forgotPasswordVerify', forgotPasswordVerify.verify);
router.patch('/resetPassword', resetPassword.reset);

// USERS
router.get('/users', auth.verify(), usersController.getData);

router.patch('/profile', auth.verify(), profileController.update);
router.get('/profile', auth.verify(), profileController.getData);
router.patch('/profile/resetPassword', auth.verify(), profileController.resetPassword);

router.get('/problems', problemController.getData);
router.get('/problemDetails', problemController.problemDetails);
router.post('/problem/run', auth.verify(), problemController.runProblem);
router.post('/problem/submit', auth.verify(), submissionController.submitProblem);
router.get('/acceptedUserProblems', auth.verify(), problemController.acceptedUserProblems);
router.get('/problem/:id/solution', auth.verify(), problemController.solution);

// SUBMISSIONS
router.get('/submissions', auth.verify(), submissionController.getSubmissionData);
router.get('/userSubmissions', auth.verify(), submissionController.getUserSubmissonsCount);
router.get('/recentSubmission', auth.verify(), submissionController.recentSubmissions);

// Challenge
router.post('/arena/createGroupChallenge', auth.verify(), arenaController.createGroupChallenge);
router.post('/joinGroupChallenge', auth.verify(), arenaController.joinGroupChallenge);
router.get('/activeChallenges', auth.verify(), arenaController.activeChallenges);
router.patch('/startChallenge', auth.verify(), arenaController.startChallenge);
router.get('/challengeResults', auth.verify(), arenaController.challengeResults);
router.get('/challenge/:id/leaderBoard', auth.verify(), arenaController.challengeLeaderBoard);

router.post('/createPairProgramming', auth.verify(), arenaController.createPairProgramming);
router.post('/joinPairProgramming', auth.verify(), arenaController.joinPairProgramming);
router.get('/pairProgrammingRequest', auth.verify(), arenaController.joinPairProgramming);

// INTERVIEW
router.post('/scheduleInterview', auth.verify(), interviewController.schedule);
router.get('/getUserInteviews', auth.verify(), interviewController.getUserInterviews);
router.post('/joinInterView', auth.verify(), interviewController.joinInterview);

// PREMIUM
router.get('/allPlans', subscriptionController.getPlans);
router.get('/subscriptionData', auth.verify(), subscriptionController.getSubscriptionData);

// PAYMENT
// router.get("initiatePayment",paymentController.)
router.post('/createPayment', paymentController.createPaymentOrder);


// SUBSCRIBE PLAN IF VERIFEID PAYMENT
router.post('/verifyPayment',
  auth.verify(),
  paymentController.verifyPayment,
  subscriptionController.createSubscription);


// REPORT
router
  .route('/report')
  .post(auth.verify(), reportController.createReport);



//FileUPload
const upload = multer()
router.post("/uploadImage", upload.single("file"), profileController.profilePicUpload)


// NOTIFICATION
router.patch('/readNotification', auth.verify(), notificationController.readNotification);
router.get('/notification', auth.verify(), notificationController.userAllNotification);



export default router;
