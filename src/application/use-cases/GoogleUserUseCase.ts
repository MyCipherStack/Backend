import { AppError } from "@/domain/error/AppError";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm";
import { IJwtService } from "../../domain/services/IJwtService";
import { IGoogleUserUseCase } from "../interfaces/use-cases/IUserUseCase";

interface AuthResult {
    user: { name: string, email: string };
    accessToken: string;
    refreshToken: string;
}
export class GoogleUserUseCase implements IGoogleUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private hashService: IHashAlgorithm,
        private jwtService: IJwtService

    ) {

    }

    async execute(name: string, email: string, image: string, googleId: string): Promise<{
        user: { name: string, email: string, _id: string },
        accessToken: string, refreshToken: string
    }> {


        // const foundUser=await this.userRepository.findByEmail(email)
     


        const existingUser = await this.userRepository.findByEmail(email);

        if(existingUser?.status==="banned"){
            console.log("user blocked");
            
          throw new  Error("This Account is banned")
        }
        

        let userData: { name: string, email: string, _id: string } = { name: "", email: "", _id: "" }
        if (!existingUser) {


            //For UNIQUE NAME CREATION
            const generateName = async () => {
                const existingUsername = await this.userRepository.findByUserName(name);
                if (existingUsername) {
                    name = existingUsername.name + Math.random()
                    generateName()
                }
                generateName()

            }
            const dummyPassword = Date.now().toString() + Math.random();
            const hashedPassword = await this.hashService.hash(dummyPassword);
            const user = new User(name, email, hashedPassword, image, googleId)
            const createUser = await this.userRepository.create({
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.image,
                googleId: user.email,
            } as any)

            userData = createUser

        } else {
            userData = existingUser

        }



        const accessToken = this.jwtService.signAccessToken({ emai: userData.email, name: userData.name, userId: userData._id, role: "user" })
        const refreshToken = this.jwtService.signRefereshToken({ emai: userData.email, name: userData.name, userId: userData._id, role: "user" })
        console.log(accessToken, refreshToken);

        return { user: userData, accessToken, refreshToken }
    }
}