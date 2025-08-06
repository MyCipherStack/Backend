import bcrypt from 'bcryptjs';
import { IHashAlgorithm } from '@/domain/services/IHashAlgorithm';

export class BcryptHashAlgorithm implements IHashAlgorithm {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
