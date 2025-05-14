import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseService } from './mongoose.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Security Headers
  app.use(helmet());

  //  Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  //  Global Pipes & Guards
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  // Global pipes
  app.useGlobalPipes(new ValidationPipe());
  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('User sign-up and login endpoints')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 🛡️ Check MongoDB Connection
  const mongooseService = app.get(MongooseService);
  const isConnected = await mongooseService.isDbConnected();

  if (!isConnected) {
    console.error('❌ Could not connect to MongoDB. Shutting down...');
    await app.close();
    process.exit(1);
  }

  // 🚀 Start Server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ Application is running on http://localhost:${port}`);
  console.log(`🟢 Database is connected`);
}
bootstrap();