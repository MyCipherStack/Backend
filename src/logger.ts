
import {createLogger, format, transports} from "winston"
import LokiTransport from "winston-loki"


export const logger=createLogger({
    level:"info",
    format:format.json(),
    transports:[
        new LokiTransport({
            host:"http://localhost:3100",
            labels:{job:"express-backend"},
        }),
        new transports.Console()
    ]  

})