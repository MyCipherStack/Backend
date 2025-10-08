  import Jwt, { JwtPayload } from 'jsonwebtoken';
  import { IJwtService } from '@/domain/services/IJwtService'; 
import { RoleMiddleware } from '@/middlewares/RoleMiddleware';

export interface tokenPayload extends JwtPayload {
  name: string;
  role: string;
  id: string;
}

  export class JwtService implements IJwtService {
    constructor(
          private readonly accessTokenSecret:string,
          private readonly RefreshTokenSecret:string,
    ) {}

    signAccessToken(payload: { name: string, role: string,userId: string }): string {
      return Jwt.sign(payload, this.accessTokenSecret, { expiresIn: '1h' });
    }

    signRefreshToken(payload: { name: string, role: string, userId: string }): string {
      return Jwt.sign(payload, this.RefreshTokenSecret, { expiresIn: '7d' });
    }

    verifyRefreshToken(token: string):tokenPayload {
      return Jwt.verify(token, this.RefreshTokenSecret) as tokenPayload;
    }

    verifyAccessToken(token: string):tokenPayload {
      return Jwt.verify(token, this.accessTokenSecret) as tokenPayload;
    }
    
  }
