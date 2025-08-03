import axios from 'axios';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class SendToOllama {
  async generateResponse(prompt: string): Promise<string> {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'starcoder',
        prompt,
        stream: false,
      });

      return res.data.response;
    } catch (error) {
      logger.error('Error in sendToOllama.generateRResponse:', error);
      throw error;
    }
  }
}
