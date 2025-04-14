import { Admin } from "../../domain/entities/admin.js";
import { IAdminRepository } from "../../domain/repositories/IadminRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IJwtService } from "../../domain/services/IJwtService.js";
import adminModel from "../../infrastructure/database/AdminModel.js";


export class LoginAdminUsecase{
    constructor(
        private adminRepository:IAdminRepository,
        private hashService:IHashAlgorithm,
        private JwtService:IJwtService
    ){}
    async execute(name:string,password:string){
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

        const accessToken= this.JwtService.signAccessToken({name:foundAdmin.name,role:"admin"})
        const refreshToken= this.JwtService.signRefereshToken({name:foundAdmin.name,role:"admin"})
        const storeToken=await this.adminRepository.findByIdAndUpdate(foundAdmin.id,{refreshToken})
        console.log(accessToken,refreshToken);

        
         const admin = new Admin(foundAdmin.name,foundAdmin.password,foundAdmin.id);
        return {admin:admin.toDTO(),refreshToken,accessToken}
    }
}