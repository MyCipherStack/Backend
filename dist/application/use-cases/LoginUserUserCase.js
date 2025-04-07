export class LoginUserUseCase {
    userRepository;
    hashService;
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async execute(identifier, password) {
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identifier);
        let foundUser = {};
        if (isEmail) {
            foundUser = await this.userRepository.findByEmail(identifier);
        }
        else {
            foundUser = await this.userRepository.findByUserName(identifier);
        }
        console.log(foundUser);
        if (foundUser) {
            const passCheck = await this.hashService.comparePassword(password, foundUser.password);
            console.log(passCheck);
        }
    }
}
