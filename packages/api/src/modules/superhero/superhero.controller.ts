import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSuperHeroDto } from './dto/create-superhero.dto';
import { CreateSuperHero, Response } from '../../common/types/shared.types';
import { SuperheroService } from './superhero.service';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  createSuperhero(@Body() body: CreateSuperHeroDto): Response<CreateSuperHero> {
    const createdSuperhero = this.superheroService.createSuperhero(body);
    return {
      data: createdSuperhero,
    };
  }

  @Get()
  findAllSuperheroes(): Response<CreateSuperHero[]> {
    const superheroes = this.superheroService.findAllSuperheroes();
    return {
      data: superheroes,
    };
  }
}
