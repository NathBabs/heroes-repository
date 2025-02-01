import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseStatusInterceptor } from './common/interceptors/response-status.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
  });

  // Apply global interceptor
  app.useGlobalInterceptors(new ResponseStatusInterceptor());

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips non-whitelisted properties
      transform: true, // transforms payloads to be objects typed according to their DTO classes
      forbidNonWhitelisted: true, // throws errors when non-whitelisted properties are present
    }),
  );

  // Apply global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server running on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
