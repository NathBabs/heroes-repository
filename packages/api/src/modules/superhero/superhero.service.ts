import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateSuperHeroDto } from './dto/create-superhero.dto';
import { SuperheroRepository } from './superhero.repository';
import { CreateSuperHero } from '../../common/types/shared.types';

@Injectable()
export class SuperheroService {
  private readonly logger = new Logger(SuperheroService.name);
  constructor(private readonly superheroRepository: SuperheroRepository) {}

  /**
   * Creates a new superhero in the repository.
   *
   * @param superHero - The superhero data transfer object to create.
   * @returns The created superhero data transfer object.
   * @throws {Error} If an error occurs while creating the superhero.
   */
  createSuperhero(superHero: CreateSuperHeroDto): CreateSuperHero {
    try {
      // check if superhero already exists before adding
      if (this.superheroRepository.itExists(superHero)) {
        throw new HttpException(
          'Superhero already exists, please use a different name',
          HttpStatus.CONFLICT,
        );
      }

      return this.superheroRepository.create({
        name: superHero.name.trim(),
        superpower: superHero.superpower.trim(),
        humilityScore: superHero.humilityScore,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Retrieves all superheroes from the repository, sorted by
   * humility score
   * @returns {CreateSuperHero[]} An array of superhero data transfer objects.
   * @throws {Error} If an error occurs while retrieving the superheroes.
   */
  findAllSuperheroes(): CreateSuperHero[] {
    try {
      const superheroes = this.superheroRepository.findAll();

      // next is to sort the superheroes by humility score
      superheroes.sort((a, b) => b.humilityScore - a.humilityScore);

      return superheroes;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
