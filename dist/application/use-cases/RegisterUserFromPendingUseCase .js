export class RegisterUserFromPendingUseCase {
    pendingUserRepository;
    UserRepository;
    constructor(pendingUserRepository, UserRepository) {
        this.pendingUserRepository = pendingUserRepository;
        this.UserRepository = UserRepository;
    }
    async execute(email) {
        const pendingUser = await this.pendingUserRepository.findValidUser(email);
        if (!pendingUser) {
            throw new Error("User not found in pending list");
        }
        const existingEmail = await this.UserRepository.findByEmail(email);
        if (existingEmail) {
            throw new Error("User with this email already exists");
        }
        const user = await this.UserRepository.create({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password
        });
        return user;
    }
}
