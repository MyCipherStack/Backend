export class CreateUserDTO {
    name;
    email;
    password;
    constructor(data) {
        this.name = data.name.trim();
        this.email = data.email.trim().toLowerCase();
        this.password = data.password;
    }
}
