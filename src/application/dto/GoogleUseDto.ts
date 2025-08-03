export class GoogleDto {
  name:string;

  email:string;

  image:string;

  googleId:string;

  constructor(data:{ name: string; email: string; image: string, googleId:string }) {
    this.name = data.name;
    this.email = data.email;
    this.image = data.image;
    this.googleId = data.googleId;
  }
}
