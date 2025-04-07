import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase.js";
import { CreateUserDTO } from "../../application/dto/CreateUserDTO.js";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase.js";
import { LoginDTO } from "../../application/dto/LoginDTO.js";
export class AuthController {
    userRepository;
    hashService;
    JwtService;
    constructor(userRepository, hashService, JwtService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.JwtService = JwtService;
    }
    register = async (req, res) => {
        try {
            const userData = new CreateUserDTO(req.body);
            const createUser = new CreateUserUseCase(this.userRepository, this.hashService);
            const user = await createUser.execute(userData.name, userData.email, userData.password);
            res.status(201).json({ status: true, message: "User registered succeses" });
        }
        catch (error) {
            console.log(error.message);
            console.log(error);
            res.status(400).json({ status: false, message: error.message });
        }
    };
    login = async (req, res) => {
        try {
            const loginData = new LoginDTO(req.body);
            const loginUsecase = new LoginUserUseCase(this.userRepository, this.hashService, this.JwtService);
            let loginUser = await loginUsecase.execute(loginData.identifier, loginData.password);
            console.log(loginUser, "login use in controller");
        }
        catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    };
}
