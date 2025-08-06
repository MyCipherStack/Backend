import { IHashAlgorithm } from "@/domain/services/IHashAlgorithm"; 

export class HashService implements IHashAlgorithm {
  constructor(
        private readonly algorithm:IHashAlgorithm,
  ) {}

  async hash(password: string): Promise<string> {
    return await this.algorithm.hash(password);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await this.algorithm.compare(password, hashedPassword);
  }
}
