import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips non-whitelisted properties
      transform: true, // transforms payloads to be objects typed according to their DTO classes
      forbidNonWhitelisted: true, // throws errors when non-whitelisted properties are present
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
