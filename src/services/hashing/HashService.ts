import { IHashAlgorithm} from "../../domain/services/IHashAlgorithm.js";
import bcrypt from "bcryptjs";
export class HashService implements IHashAlgorithm{

    constructor(
        private readonly algorithm:IHashAlgorithm
    ){}

    async hashPassword(password: string): Promise<string> {
        return await this.algorithm.hashPassword(password)
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await this.algorithm.comparePassword(password,hashedPassword)
    }

}   

