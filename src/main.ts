import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = require('../config');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Use Transform Interceptor Globally
  app.useGlobalInterceptors(new TransformInterceptor());

  // Use Swagger Api Documentation
  const options = new DocumentBuilder()
    .setTitle('Lesson Service')
    .setDescription('Lesson scheduling service challenge')
    .setVersion(config.app.version)
    .addTag('CoLearn')
    .addBearerAuth()
    .addServer(`localhost:${config.app.port}`)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Run Application Instance
  await app.listen(config.app.port);
}
bootstrap();
