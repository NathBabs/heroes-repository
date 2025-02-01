import { Module } from '@nestjs/common';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { SuperheroRepository } from './superhero.repository';

@Module({
  controllers: [SuperheroController],
  providers: [SuperheroService, SuperheroRepository],
})
export class SuperheroModule {}
