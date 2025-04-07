import { temUser } from "../../domain/entities/temUser.js";
import { PendingUser } from "../database/PendingUser.js";
export class PendingUserRepository {
    async save(name, email, password) {
        const user = await PendingUser.create({ name, email, password });
        return user.email;
    }
    async updateOtp(email, temUser) {
        await PendingUser.findOneAndUpdate({ email }, { otp: temUser, createdAt: new Date() });
    }
    async findValidUser(email) {
        const found = await PendingUser.findOne({ email });
        if (!found)
            return null;
        return new temUser(found.name, found.email, found.password, found.otp ?? "", found.createdAt);
    }
    async delete(email) {
        await PendingUser.deleteOne({ email });
    }
}
