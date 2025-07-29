
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./infrastructure/database/MongoConnection"
import userRoutes from "./interfaces/routes/userRoutes"
import adminRoutes from "./interfaces/routes/adminRoutes"
import cors from "cors"
import morgan from "morgan"
dotenv.config()
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import "./infrastructure/strategies/GoogleStrategy"
import { UpdateLeaderBoardUseCase } from "./application/use-cases/user/arena/UpdateLeaderBoardUseCase"
import { LeaderBoardRepository } from "./infrastructure/repositories/LeaderBoardRepository"
import { Server } from "socket.io"
import http from "http"
import { SubmissionRepository } from "./infrastructure/repositories/SubmissionRepository"
import { ChallengeRepository } from "./infrastructure/repositories/ChallengeRespository"
import { logger } from "./infrastructure/logger/WinstonLogger/logger"
import { ErrorHandler } from "./middlewares/errorHandler"
import { LeaderBoardSocket } from "./services/websocket/LeaderBoardSocket"
import { PairProgramSocket } from "./services/websocket/PairProgramming"
import { InterviewSocket } from "./services/websocket/InterviewSocket"
import { notificationSocket } from "./services/websocket/NotificationSocket"
import { UserRepository } from "./infrastructure/repositories/UserRepository"
import { env } from "./config/env"




const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin:env.FRONTEND_URL, credentials: true
    }
})
app.use(cookieParser())
app.use(cors({ origin:env.FRONTEND_URL, credentials: true }))
app.use(express.json());
app.use(session({ secret:env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const leaderBoardRepository = new LeaderBoardRepository()
const submissionRepository = new SubmissionRepository()
const challengeReposiotry = new ChallengeRepository()
const userRepository=new UserRepository()
const updateLeaderBoardUseCase = new UpdateLeaderBoardUseCase(leaderBoardRepository, challengeReposiotry,userRepository)
const leaderBoardSocket = new LeaderBoardSocket(updateLeaderBoardUseCase, submissionRepository, leaderBoardRepository)
const pairProgramSocket = new PairProgramSocket()
const interViewSocket = new InterviewSocket()


leaderBoardSocket.register(io)
pairProgramSocket.register(io)
interViewSocket.register(io)
notificationSocket.register(io)






connectDB()

app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use(morgan("dev"))

app.use(ErrorHandler)


const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
    logger.info(`server running on prot ${PORT}`)
})