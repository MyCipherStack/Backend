import { IJwtService } from "../../domain/services/IJwtService.js";
import  Jwt  from "jsonwebtoken";

export class JwtService implements IJwtService{

    constructor(
        private readonly accessTokenSecrect:string,
        private readonly RefreshTokenSecrect:string
    ){}

    signAccessToken(payload: object): string {
        return Jwt.sign(payload,this.accessTokenSecrect,{expiresIn:"1h"})
}
    signRefereshToken(payload: object): string {
        return Jwt.sign(payload,this.RefreshTokenSecrect,{expiresIn:"7d"})
    }
    varifyRefreshToken(token: string):any {
        return Jwt.verify(token,this.RefreshTokenSecrect)
    }
    varifyAccessToken(token: string):any {
        return Jwt.verify(token,this.accessTokenSecrect)
    }



}


