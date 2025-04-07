export class LoginDTO {
    identifier;
    password;
    constructor(data) {
        this.identifier = data.name.trim(),
            this.password = data.password.trim();
    }
}
