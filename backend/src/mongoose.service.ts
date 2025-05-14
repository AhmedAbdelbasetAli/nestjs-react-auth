import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongooseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async isDbConnected(): Promise<boolean> {
    return this.connection.readyState === 1; // 1 = connected
  }
}