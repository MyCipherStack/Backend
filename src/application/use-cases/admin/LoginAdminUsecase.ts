import { Admin } from '@/domain/entities/Admin';
import { IAdminRepository } from '@/domain/repositories/IAdminRepository';
import { IHashAlgorithm } from '@/domain/services/IHashAlgorithm'; 
import { IJwtService } from '@/domain/services/IJwtService'; 
import { ILoginAdminUsecase } from '@/application/interfaces/use-cases/IAdminUseCase'; 
import { AppError } from '@/shared/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class LoginAdminUsecase implements ILoginAdminUsecase {
  constructor(
        private adminRepository:IAdminRepository,
        private hashService:IHashAlgorithm,
        private JwtService:IJwtService,
  ) {}

  async execute(name:string, password:string):Promise<{admin:{name:string}, refreshToken:string, accessToken:string}> {
    console.log('exicute  admin login');

    const foundAdmin = await this.adminRepository.findByAdminName(name);

    const hashedPassword = await this.hashService.hash(password);
    // await adminModel.create({name,password:hashedPassword})           tem create admin

    if (!foundAdmin) {
      throw new AppError('invalid admin id',HttpStatusCode.UNAUTHORIZED);
    }

    const passCheck = await this.hashService.compare(password, foundAdmin.password);

    if (!passCheck) {
      throw new AppError('Incorrect password. Please try again.',HttpStatusCode.UNAUTHORIZED);
    }

    const accessToken = this.JwtService.signAccessToken({ name: foundAdmin.name, role: 'admin', userId: foundAdmin.id });
    const refreshToken = this.JwtService.signRefreshToken({ name: foundAdmin.name, role: 'admin',userId: foundAdmin.id });
    const storeToken = await this.adminRepository.updateOneById(foundAdmin.id, { refreshToken });
    console.log(accessToken, refreshToken);

    const admin = new Admin(foundAdmin.name, foundAdmin.password, foundAdmin.id);

    return { admin: admin.toDTO(), refreshToken, accessToken };
  }
}
