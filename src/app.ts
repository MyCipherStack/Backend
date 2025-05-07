
import express from "express"
import dotenv from "dotenv"
import { connectDB} from "./infrastructure/database/MongoConnection.js"
import userRoutes from "./interfaces/routes/userRoutes.js"
import adminRoutes from "./interfaces/routes/adminRoutes.js"
import cors from "cors"
import morgan from "morgan"
dotenv.config()
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import "./infrastructure/strategies/GoogleStrategy.js"
import { LeaderBoardSocketHandler } from "./services/websocket/leaderBoardHandler.js"
import { UpdateLeaderBoardUseCase } from "./application/use-cases/UpdateLeaderBoardUseCase.js"
import { LeaderBoardRespository } from "./infrastructure/repositories/LeaderBoardRepository.js"
import {Server} from "socket.io"
import http from "http"



const app=express();
const httpServer=http.createServer(app)
const io=new Server(httpServer,{
    cors:{
        origin:"*"
    }
})
app.use(cookieParser())
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json());
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const leaderBoardRepository=new LeaderBoardRespository()
const updateLeaderBoardUseCase=new UpdateLeaderBoardUseCase(leaderBoardRepository)
const leaderBoardSocketHandler=new LeaderBoardSocketHandler(updateLeaderBoardUseCase)
leaderBoardSocketHandler.register(io)
connectDB()

app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)

app.use(morgan("dev"))

const PORT=process.env.PORT || 5000
httpServer.listen(PORT,()=>{
    console.log(`server running on prot ${PORT}`);
    
})