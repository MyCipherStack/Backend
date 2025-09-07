export interface IJwtService{
    signAccessToken(payload:object):string;
    signRefreshToken(payload:object):string;
    verifyAccessToken(token:string):any
    verifyRefreshToken(token:string):any
}
