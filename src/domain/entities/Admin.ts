

export class Admin {
  constructor(
        public name:string,
        public password:string,
        public id:string,
        public refreshToken?:string,
  ) {}

  toDTO() {
    return {
      name: this.name,
    };
  }
}
