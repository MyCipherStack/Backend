import { JwtPayload } from "jsonwebtoken";

interface tokenPayload extends JwtPayload {
  name: string;
  role: string;
  userId: string;
} 


export interface IJwtService{
    signAccessToken(payload:{ name: string, role: string, userId: string }):string;
    signRefreshToken(payload:{ name: string, role: string, userId: string }):string;
    verifyAccessToken(token:string):tokenPayload;
    verifyRefreshToken(token:string):tokenPayload;
}
