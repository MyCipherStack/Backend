import { Authenticate } from './Authenticate';

export class AuthMiddlwareBundler {
  constructor(
        private authenticate:any,
        private authorize:any,
        private role:string,
  ) {}

  verify = () => [

    this.authenticate.verify,
    this.authorize.requireRole([this.role]),
  ];
}
