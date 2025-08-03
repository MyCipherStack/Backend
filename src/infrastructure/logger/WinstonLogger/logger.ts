import winston, { createLogger, format, transports } from 'winston';
import LokiTransport from 'winston-loki';
import { env } from '@/config/env';

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new LokiTransport({
      host: env.LOKI_TRANSPORT_HOST,
      labels: { job: 'express-backend' },
    }),
    // new transports.Console()

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, ...meta }) => ` ${level}: ${message} ${
          Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
        }`),
      ),
    }),

  ],

});
