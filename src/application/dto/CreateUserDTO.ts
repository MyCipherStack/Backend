export class CreateUserDTO {
  name:string;

  email:string;

  password:string;

  constructor(data:{ name: string; email: string; password: string }) {
    this.name = data.name.trim();
    this.email = data.email.trim().toLowerCase();
    this.password = data.password;
  }
}
