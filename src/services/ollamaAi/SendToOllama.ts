import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import axios from "axios";




export class SendToOllama {

    async generateResponse(prompt: string): Promise<string> {
        try {

            const res = await axios.post("http://localhost:11434/api/generate", {
                model: "starcoder",
                prompt: prompt,
                stream: false,
            })

            return res.data.response

        } catch (error) {
        logger.error("Error in sendToOllama.generateRResponse:", error);
            throw error;
        }
    }

}