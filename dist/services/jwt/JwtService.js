import Jwt from "jsonwebtoken";
export class JwtService {
    accessTokenSecrect;
    RefreshTokenSecrect;
    constructor(accessTokenSecrect, RefreshTokenSecrect) {
        this.accessTokenSecrect = accessTokenSecrect;
        this.RefreshTokenSecrect = RefreshTokenSecrect;
    }
    signAccessToken(payload) {
        return Jwt.sign(payload, this.accessTokenSecrect, { expiresIn: "1h" });
    }
    signRefereshToken(payload) {
        return Jwt.sign(payload, this.RefreshTokenSecrect, { expiresIn: "15m" });
    }
    varifyRefreshToken(token) {
        return Jwt.verify(token, this.RefreshTokenSecrect);
    }
    varifyAccessToken(token) {
        return Jwt.verify(token, this.accessTokenSecrect);
    }
}
