import express from 'express';
import { AdminAuthController } from '../controller/admin/AdminAuthController';
import { AdminRepository } from '../../infrastructure/repositories/AdminRepository';
import { BcryptHashAlgorithm } from '../../services/hashing/BcryptHashAlgorithm';
import { HashService } from '../../services/hashing/HashService';
import { IHashAlgorithm } from '../../domain/services/IHashAlgorithm';
import { env } from '../../config/env';
import { JwtService } from '../../services/jwt/JwtService';
import { IAdminRepository } from '@/domain/repositories/IAdminRepository';
import { UsersListController } from '../controller/admin/UsersListController';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { AdminProblemController } from '../controller/admin/AdminProblemContoller';
import { ProblemRepository } from '../../infrastructure/repositories/ProblemRepository';
import { IProblemRepository } from '../../domain/repositories/IProblemRepository';
import { AddProblemUseCase } from '@/application/use-cases/admin/AddProblemUseCase';
import { EditProblemUseCase } from '@/application/use-cases/admin/EditProblemUseCase';
import { IAddProblemUseCase } from '../../application/interfaces/use-cases/IProblemUseCases';
import { AdminPremiumPlanController } from '../controller/admin/AdminPremiumPlanController';
import { PremiumPlanRepository } from '../../infrastructure/repositories/premiumPlanRepository';
import { IpremiumPlanRepository } from '../../domain/repositories/IPremiumPlanRepositroy';
import { GetFilteredUsersUseCase } from '@/application/use-cases/user/user-mangement/GetFilteredUsers';
import { Authenticate } from '@/middlewares/Authenticate';
import { RoleMiddleware } from '@/middlewares/RoleMiddleware';
import { AuthMiddlwareBundler } from '@/middlewares/AuthMiddlwareBundler';
import { Admin } from '@/domain/entities/Admin';
import { GetRepositoryDataUseCase } from '@/application/use-cases/shared/GetRepositoryDataUseCase';
import { ChallengeController } from '../controller/admin/ChallengeController';
import { ChallengeRepository } from '@/infrastructure/repositories/ChallengeRespository';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { PairProgramming } from '@/domain/entities/PairProgramming';
import { PairProgrammingRepository } from '@/infrastructure/repositories/PairProgrammingRepository';
import { IPairProgrammingRepository } from '@/domain/repositories/IPairProgrammingRepository';
import { DashboardBoardController } from '../controller/admin/DashboardController';
import { AdminDashBoardUseCase } from '@/application/use-cases/admin/AdminDashBoardUseCase';
import { GetAllReportsUsecase } from '@/application/use-cases/user/GetAllReportsUsecase';
import { AdminReportController } from '../controller/admin/AdminReportController';
import { IReportRepository } from '@/domain/repositories/IReportRepository';
import { ReportRepository } from '@/infrastructure/repositories/ReportRepository';
import { ChangeRepoStatusUseCase } from '@/application/use-cases/shared/ChangeRepoStatusUseCase';
import { Report } from '@/domain/entities/Report';
import { TransactionRespotitory } from '@/infrastructure/repositories/TransactionsRespositoy';
import { UpdateUserUseCase } from '@/application/use-cases/user/user-mangement/UpdateUserUseCase';
import { LoginAdminUsecase } from '@/application/use-cases/admin/LoginAdminUsecase';
import { CreateRepoUseCase } from '@/application/use-cases/shared/CreateRepoUseCase';
import { EditPlanUseCase } from '@/application/use-cases/admin/EditPlanUseCase';
import { PairProgrammingController } from '../controller/admin/PairProgrammingController';
import { TransationController } from '../controller/admin/TransationController';
import { LeaderBoardRepository } from '@/infrastructure/repositories/LeaderBoardRepository';
import { TransactionUseCase } from '@/application/use-cases/admin/TransactionUseCase';
import { UpdateRepositoryDataUseCase } from '@/application/use-cases/shared/UpdateRepositoryDataUseCase';

const router = express.Router();

const adminRepository: IAdminRepository = new AdminRepository();
const userRepository: IUserRepository = new UserRepository();
const problemRespository: IProblemRepository = new ProblemRepository();
const premiumPlanRepository: IpremiumPlanRepository = new PremiumPlanRepository();
const challengeRepository: ChallengeRepository = new ChallengeRepository();
const pairProgrammingRepository: IPairProgrammingRepository = new PairProgrammingRepository();
const reportRepository: IReportRepository = new ReportRepository();
const transactionRepository = new TransactionRespotitory();

const algorithm = new BcryptHashAlgorithm(); // dip for hashServices
const hashService: IHashAlgorithm = new HashService(algorithm);

const accessToken = env.ACCESS_JWT_TOKEN;
const refreshToken = env.REFRESH_JWT_TOKEN;
const jwtService = new JwtService(accessToken, refreshToken);

const addProblemUseCase: IAddProblemUseCase = new AddProblemUseCase(problemRespository);
const editProblemUseCase = new EditProblemUseCase(problemRespository);
const getFilteredUsersUseCase = new GetFilteredUsersUseCase(userRepository);
const adminDashBoardUseCase = new AdminDashBoardUseCase(userRepository, transactionRepository);
const getAllReportsUsecase = new GetAllReportsUsecase(reportRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const loginAdminUsecase = new LoginAdminUsecase(adminRepository, hashService, jwtService);
const editPlanUseCase = new EditPlanUseCase(premiumPlanRepository);
const transactionUsecase = new TransactionUseCase(transactionRepository);

const getAdminRepoDataUseCase = new GetRepositoryDataUseCase<Admin>(adminRepository);
const getchallengeRepoDataUseCase = new GetRepositoryDataUseCase<GroupChallenge>(challengeRepository);
const getPaiProgarmmingRepoDataUseCase = new GetRepositoryDataUseCase<PairProgramming>(pairProgrammingRepository);
const changeRespoStatusUseCase = new ChangeRepoStatusUseCase(reportRepository);
const createPremiumRepoUseCase = new CreateRepoUseCase(premiumPlanRepository);
const getPremiumDataUseCase = new GetRepositoryDataUseCase(premiumPlanRepository);
const updateChallengeRepoDataUseCase = new UpdateRepositoryDataUseCase(challengeRepository);
const updatePairRepoDataUseCase = new UpdateRepositoryDataUseCase(pairProgrammingRepository);
const changePairProgramStatusUSeCase = new ChangeRepoStatusUseCase(pairProgrammingRepository);
const allTransationsDataUseCase = new GetRepositoryDataUseCase(transactionRepository);

// const addProblemUseCase=new AddProblemUseCase(problemRespository)

const adminAuthController = new AdminAuthController(loginAdminUsecase);
const usersListController = new UsersListController(getFilteredUsersUseCase, updateUserUseCase);
const adminProblemController = new AdminProblemController(addProblemUseCase, editProblemUseCase);
const adminPremiumPlanController = new AdminPremiumPlanController(createPremiumRepoUseCase, getPremiumDataUseCase, editPlanUseCase);
const challengeController = new ChallengeController(challengeRepository, updateChallengeRepoDataUseCase);
const dashboardController = new DashboardBoardController(adminDashBoardUseCase);
const adminReportController = new AdminReportController(getAllReportsUsecase, changeRespoStatusUseCase);
const pairProgrammingController = new PairProgrammingController(pairProgrammingRepository, updatePairRepoDataUseCase);
const transationController = new TransationController(transactionUsecase);

const authenticate = new Authenticate(jwtService, getAdminRepoDataUseCase);
const authorize = new RoleMiddleware();
const auth = new AuthMiddlwareBundler(authenticate, authorize,'admin');

router.post('/login', adminAuthController.login);
router.post('/logout', adminAuthController.logout);
router.get('/users', auth.verify(), usersListController.getData);
router.get('/transations', auth.verify(), transationController.allTransations);
router.patch('/user', auth.verify(), usersListController.updateUser);
router.post('/addProblem', auth.verify(), adminProblemController.addProblem);
router.post('/editProblem', auth.verify(), adminProblemController.editProblem);
router.post('/createPremiumPlan', auth.verify(), adminPremiumPlanController.createNewPlan);
router.get('/adminAllPlans', auth.verify(), adminPremiumPlanController.getPlans);
router.post('/editPremiumPlan', auth.verify(), adminPremiumPlanController.editPlan);

router.get('/getAllGroupChallenges', auth.verify(), challengeController.allGroupChallenges);
router.get('/getAllPairProgramming', auth.verify(), pairProgrammingController.getAllPairProgramming);
router.get('/dashboard', auth.verify(), dashboardController.getAllDashBoardData);

router
  .route('/report')
  .get(auth.verify(), adminReportController.getAllreports)
  .patch(auth.verify(), adminReportController.updateReportStatus);

router.patch('/challengeChangeStatus', auth.verify(), challengeController.changeStatus);
router.patch('/changeStatusPairProgarm', auth.verify(), pairProgrammingController.changeStatus);

export default router;
