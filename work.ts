import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../domain/User";

export class AuthService {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async compares(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  }
}





import bcrypt from "bcryptjs";

export class HashService {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async compares(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}


import jwt from "jsonwebtoken";
import { User } from "../../domain/entities/User";

export class TokenService {
  static generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  }
}
