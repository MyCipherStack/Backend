import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IHashAlgorithm } from "@/domain/services/IHashAlgorithm";
import { IJwtService } from "@/domain/services/IJwtService"; 
import { ILoginUserUseCase } from "@/application/interfaces/use-cases/IUserUseCase"; 


export class LoginUserUseCase implements ILoginUserUseCase {
    constructor(
        private userRepository:IUserRepository,
        private hashService:IHashAlgorithm,
        private JwtService:IJwtService
    ){}
    async execute(identifier:string,password:string){
        console.log("exicute in login");
        
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identifier);
        let foundUser=null
        console.log(isEmail,"isemail");
        
        if(isEmail){
             foundUser=await this.userRepository.findByEmail(identifier)
        }else{
             foundUser=await this.userRepository.findByUserName(identifier)
        } 
        console.log(foundUser,"founduser");
          
        if(!foundUser?.password){
            throw new Error("User not found with this email or password");
        }

        if(foundUser.status=="banned"){ throw new Error("This account was banned");}

            const passCheck=await this.hashService.compare(password,foundUser.password)

        if(!passCheck){ throw new Error("Incorrect password. Please try again.");
        }
    
        const accessToken= this.JwtService.signAccessToken({userId:foundUser._id,name:foundUser.name,role:"user"})
        const refreshToken= this.JwtService.signRefereshToken({userId:foundUser._id,name:foundUser.name,role:"user"})
        logger.info(accessToken,refreshToken);
        //  
        return {user:{name:foundUser.name,email:foundUser.email,image:foundUser.image,id:foundUser._id},refreshToken,accessToken}
    }
}