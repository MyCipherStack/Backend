
import express from "express"
import dotenv from "dotenv"
import { connectDB} from "./infrastructure/database/MongoConnection"
import userRoutes from "./interfaces/routes/userRoutes"
import adminRoutes from "./interfaces/routes/adminRoutes"
import cors from "cors"
import morgan from "morgan"
dotenv.config()
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import "./infrastructure/strategies/GoogleStrategy"
import { LeaderBoardSocketHandler } from "./services/websocket/leaderBoardHandler"
import { UpdateLeaderBoardUseCase } from "./application/use-cases/UpdateLeaderBoardUseCase"
import { LeaderBoardRepository } from "./infrastructure/repositories/LeaderBoardRepository"
import {Server} from "socket.io"
import http from "http"
import { SubmissionRepository } from "./infrastructure/repositories/SubmissionRepository"
import { ChallengeRepository } from "./infrastructure/repositories/ChallengeRespository"
import { logger } from "./logger"
import { ErrorHandler } from "./middlewares/errorHandler"




const app=express();
const httpServer=http.createServer(app)
const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000",credentials:true
    }
})
app.use(cookieParser())
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json());
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const leaderBoardRepository=new LeaderBoardRepository()
const submissionRepository=new SubmissionRepository()
const challengeReposiotry=new ChallengeRepository()
const updateLeaderBoardUseCase=new UpdateLeaderBoardUseCase(leaderBoardRepository,challengeReposiotry)
const leaderBoardSocketHandler=new LeaderBoardSocketHandler(updateLeaderBoardUseCase,submissionRepository,leaderBoardRepository)
leaderBoardSocketHandler.register(io)
connectDB()

app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
app.use(morgan("dev"))

app.use(ErrorHandler)


const PORT=process.env.PORT || 5000

httpServer.listen(PORT,()=>{
    logger.info(`server running on prot ${PORT}`)
})