  import Jwt from 'jsonwebtoken';
  import { IJwtService } from '@/domain/services/IJwtService'; 

  export class JwtService implements IJwtService {
    constructor(
          private readonly accessTokenSecret:string,
          private readonly RefreshTokenSecret:string,
    ) {}

    signAccessToken(payload: object): string {
      return Jwt.sign(payload, this.accessTokenSecret, { expiresIn: '1h' });
    }

    signRefreshToken(payload: object): string {
      return Jwt.sign(payload, this.RefreshTokenSecret, { expiresIn: '7d' });
    }

    verifyRefreshToken(token: string):any {
      return Jwt.verify(token, this.RefreshTokenSecret);
    }

    verifyAccessToken(token: string):any {
      return Jwt.verify(token, this.accessTokenSecret);
    }
    
  }
