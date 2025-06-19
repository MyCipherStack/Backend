
import winston, {createLogger, format, transports} from "winston"
import LokiTransport from "winston-loki"


export const logger=createLogger({
    level:"info",
    format:format.json(),
    transports:[
        new LokiTransport({
            host:"http://localhost:3100",
            labels:{job:"express-backend"},
        }),
        // new transports.Console()

        new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.printf(({ level, message, ...meta }) => {
                return ` ${level}: ${message} ${
                  Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
                }`;
              })
            ),
          }),


    ]  

})