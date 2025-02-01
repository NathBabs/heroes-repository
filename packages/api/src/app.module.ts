import { Module } from '@nestjs/common';
import { Modules } from './modules/modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.local', '.env'],
    }),
    Modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
