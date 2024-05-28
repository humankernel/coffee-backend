import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  // validation
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Coffee Shop API')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
