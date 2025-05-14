import { Controller, Get } from '@nestjs/common';
import { MongooseService } from './mongoose.service';

@Controller()
export class AppController {
  constructor(private readonly mongooseService: MongooseService) {}

  @Get()
  async getHello(): Promise<string> {
    const isConnected = await this.mongooseService.isDbConnected();
    return isConnected
      ? 'Welcome to the Auth API! Database is connected.'
      : 'Welcome to the Auth API! Database is NOT connected.';
  }
}