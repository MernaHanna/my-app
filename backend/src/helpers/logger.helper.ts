import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});
