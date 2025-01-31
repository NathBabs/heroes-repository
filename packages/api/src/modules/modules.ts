import { Global, Module } from '@nestjs/common';
import { SuperheroModule } from './superhero/superhero.module';

@Global()
@Module({
  imports: [SuperheroModule],
  controllers: [],
  providers: [],
})
export class Modules {}
