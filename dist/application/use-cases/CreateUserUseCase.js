import { User } from "../../domain/entities/User.js";
export class CreateUserUseCase {
    userRepository;
    hashService;
    pendingUserRepository;
    constructor(userRepository, hashService, pendingUserRepository) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.pendingUserRepository = pendingUserRepository;
    }
    async execute(name, email, password) {
        const existingEmail = await this.userRepository.findByEmail(email);
        const existingUsername = await this.userRepository.findByUserName(name);
        if (existingUsername) {
            throw new Error("Username already exists");
        }
        if (existingEmail) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await this.hashService.hashPassword(password);
        const user = new User(name, email, hashedPassword);
        const createdUserEmail = await this.pendingUserRepository.save(user.name, user.email, user.password);
        return createdUserEmail;
    }
}
