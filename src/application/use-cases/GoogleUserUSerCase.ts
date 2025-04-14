import { User } from "../../domain/entities/User.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IJwtService } from "../../domain/services/IJwtService.js";

interface AuthResult {
    user:{name:string,email:string};
    accessToken: string;
    refreshToken: string;
  }
export class GoogleUserUSerCase{
    constructor(
private userRepository: IUserRepository,
    private hashService: IHashAlgorithm,
    private jwtService:IJwtService

    ){

    }

  async execute(name: string, email: string,image:string,googleId:string): Promise<AuthResult > {
    const existingUser = await this.userRepository.findByEmail(email);
    let userData:{name:string,email:string}={name:"",email:""}
    if (!existingUser) {

        
        //For UNIQUE NAME CREATION
        const generateName=async()=>{
            const existingUsername = await this.userRepository.findByUserName(name);    
            if (existingUsername) {
                name=existingUsername.name+Math.random()
                generateName()
            }
            generateName()
            
        }
        const dummyPassword = Date.now().toString()+Math.random();
        const hashedPassword = await this.hashService.hash(dummyPassword);
        const user=new User(name,email,hashedPassword,image,googleId)
        const createUser=await this.userRepository.create({
            name:user.name,
            email:user.email,
            password:user.password,
            image:user.image,
            googleId:user.email,
        } as any)
        userData=createUser
    }else{
          userData=existingUser

      }


    
    const accessToken= this.jwtService.signAccessToken({emai:userData.email,name:userData.name})
    const refreshToken= this.jwtService.signRefereshToken({emai:userData.email,name:userData.name})
    console.log(accessToken,refreshToken);

    return {user:userData,accessToken,refreshToken}
}
}