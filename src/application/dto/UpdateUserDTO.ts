export class UpdateUserDTO {
  email?:string;

  status?:string;

  constructor(data:{email:string, status:string}) {
    this.email = data.email;
    this.status = data.status;
  }
}
