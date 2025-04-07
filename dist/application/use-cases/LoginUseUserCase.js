export class LoginUserUseCase {
    userRepository;
    hashService;
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async execute(identifier, password) {
    }
}
