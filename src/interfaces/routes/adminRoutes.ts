
import express from  "express"
import { AdminAuthContoller } from "../controller/admin/AdminAuthContoller.js"
import { AdminRepository } from "../../infrastructure/repositories/AdminRepository.js"
import { BcryptHashAlgorithm } from "../../services/hashing/BcryptHashAlgorithm.js"
import { HashService } from "../../services/hashing/HashService.js"
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js"
import { env } from "../../config/env.js"
import { JwtService } from "../../services/jwt/JwtService.js"
import { IAdminRepository } from "../../domain/repositories/IadminRepository.js"
import { UsersListController } from "../controller/admin/UsersListController.js"
import { IUserRepository } from "../../domain/repositories/IUserRepository.js"
import { UserRepository } from "../../infrastructure/repositories/UserRepository.js"



const router=express.Router()

    const adminRepository:IAdminRepository=new AdminRepository()
    const userRepository:IUserRepository=new UserRepository()

  const algorithm=new BcryptHashAlgorithm()     // dip for hashServices
  const hashService:IHashAlgorithm=new HashService(algorithm)



    const accessToken=env.ACCESS_JWT_TOKEN
    const refreshToken=env.REFRESH_JWT_TOKEN
    const jwtService=new JwtService(accessToken,refreshToken)

    const adminAuthContoller=new AdminAuthContoller(adminRepository,hashService,jwtService)
    const usersListController=new UsersListController(userRepository)

router.post("/login",adminAuthContoller.login)
router.post("/logout",adminAuthContoller.logout)
router.get("/users",usersListController.getData)




export default router