import { Injectable } from '@nestjs/common'; // ✅ Added
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { format, transports } from 'winston';
import { join } from 'path';

const logDir = join(__dirname, '../../logs');

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    });

    this.logger = winston.createLogger({
      level: 'debug',
      format: format.combine(
        format.timestamp(),
        logFormat,
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: join(logDir, 'app.log') }),
      ],
    });
  }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - ${trace || ''}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}