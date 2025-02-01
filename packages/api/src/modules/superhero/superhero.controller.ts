import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
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
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Superhero created successfully',
      data: createdSuperhero,
    };
  }

  @Get()
  findAllSuperheroes(): Response<CreateSuperHero[]> {
    const superheroes = this.superheroService.findAllSuperheroes();
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Superheroes retrieved successfully',
      data: superheroes,
    };
  }
}
