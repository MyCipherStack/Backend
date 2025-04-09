
import express from "express"
import dotenv from "dotenv"
import { connectDB} from "./infrastructure/database/MongoConnection.js"
import userRoutes from "./interfaces/routes/userRoutes.js"
import cors from "cors"
dotenv.config()
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import "./infrastructure/strategies/GoogleStrategy.js"

const app=express();
app.use(cookieParser())
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json());
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connectDB()

app.use("/api/user",userRoutes)
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on prot ${PORT}`);
    
})