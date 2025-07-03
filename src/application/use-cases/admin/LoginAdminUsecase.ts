import { Admin } from "../../../domain/entities/Admin";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { IHashAlgorithm } from "../../../domain/services/IHashAlgorithm";
import { IJwtService } from "../../../domain/services/IJwtService";
import { ILoginAdminUsecase } from "../../interfaces/use-cases/IAdminUseCase";


export class LoginAdminUsecase implements ILoginAdminUsecase {
    constructor(
        private adminRepository:IAdminRepository,
        private hashService:IHashAlgorithm,
        private JwtService:IJwtService
    ){}
    async execute(name:string,password:string):Promise<{admin:{name:string},refreshToken:string,accessToken:string}>{
        console.log("exicute  admin login");
        
        
      
        const     foundAdmin=await this.adminRepository.findByAdminName(name)

        const hashedPassword = await this.hashService.hash(password);
        // await adminModel.create({name,password:hashedPassword})           tem create admin


        if(!foundAdmin){
         throw new Error("admin not found with this name or password");
        }


            const passCheck=await this.hashService.compare(password,foundAdmin.password)

        if(!passCheck){ throw new Error("Incorrect password. Please try again.");
        }
        
        const accessToken= this.JwtService.signAccessToken({name:foundAdmin.name,role:"admin",id:foundAdmin._id})
        const refreshToken= this.JwtService.signRefereshToken({name:foundAdmin.name,role:"admin",id:foundAdmin._id})
        const storeToken=await this.adminRepository.updateOneById(foundAdmin.id,{refreshToken})
        console.log(accessToken,refreshToken);
        
        
        const admin = new Admin(foundAdmin.name,foundAdmin.password,foundAdmin.id);
        
        return {admin:admin.toDTO(),refreshToken,accessToken}
    
        
    }
}