import { IHashAlgorithm} from "../../domain/services/IHashAlgorithm.js";
import bcrypt from "bcryptjs";
export class HashService implements IHashAlgorithm{

    constructor(
        private readonly algorithm:IHashAlgorithm
    ){}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password,10)
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password,hashedPassword)
    }

}   

