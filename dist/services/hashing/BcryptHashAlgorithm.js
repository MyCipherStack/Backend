import bcrypt from "bcryptjs";
export class BcryptHashAlgorithm {
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
