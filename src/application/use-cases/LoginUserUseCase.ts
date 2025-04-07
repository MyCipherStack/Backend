import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IJwtService } from "../../domain/services/IJwtService.js";


export class LoginUserUseCase{
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
        if(!foundUser){
            throw new Error("User not found with this email or password");
        }

            const passCheck=await this.hashService.comparePassword(password,foundUser.password)

        if(!passCheck){ throw new Error("Incorrect password. Please try again.");
        }
       
        const accessToken= this.JwtService.signAccessToken({emai:foundUser.email,name:foundUser.name})
        const refreshToken= this.JwtService.signRefereshToken({emai:foundUser.email,name:foundUser.name})
        console.log(accessToken,refreshToken);

        
         const user = new User(foundUser.name, foundUser.email,foundUser.password);
        return {user:user.toDTO(),refreshToken,accessToken}
    }
}