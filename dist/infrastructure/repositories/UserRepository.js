import { User } from "../../domain/entities/User.js";
import UserModel from "../database/UserModel.js";
export class UserRepository {
    async create(user) {
        const newUser = await UserModel.create({ name: user.name, email: user.email, password: user.password });
        return new User(newUser.name, newUser.email, newUser.password);
    }
    async findByEmail(email) {
        const getUser = await UserModel.findOne({ email }).lean();
        if (!getUser)
            return null;
        return new User(getUser.name, getUser.email, getUser.password);
    }
    async findById(id) {
        const getUser = await UserModel.findById(id).lean();
        if (!getUser)
            return null;
        return new User(getUser.name, getUser.email, getUser.password);
    }
    async findByUserName(name) {
        const getUser = await UserModel.findOne({ name }).lean();
        if (!getUser)
            return null;
        return new User(getUser.name, getUser.email, getUser.password);
    }
}
