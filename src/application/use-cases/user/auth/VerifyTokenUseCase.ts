import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { IVerifyAccessTokenUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { User } from "@/domain/entities/User";
import { IJwtService } from "@/domain/services/IJwtService";



export class VerifyAccessTokenUseCase implements IVerifyAccessTokenUseCase {
    constructor(
        private jwtService: IJwtService,
        private getRepositoryDataUseCase: IGetRepositoryDataUseCase<User>
    ) { }




    async execute(token: string): Promise< User| null> {

        const tokenData = this.jwtService.verifyAccessToken(token);

        const foundUser = null;
        if (tokenData) {

            const foundUser = await this.getRepositoryDataUseCase.OneDocumentById(tokenData.userId);

           return  foundUser  ?? null;

        } else {
            return null
        }


    }
}