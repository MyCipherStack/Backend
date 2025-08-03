export interface IJwtService{
    signAccessToken(payload:object):string;
    signRefereshToken(payload:object):string;
    varifyAccessToken(token:string):any
    varifyRefreshToken(token:string):any
}
