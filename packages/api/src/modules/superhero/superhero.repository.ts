import { Injectable } from '@nestjs/common';
import { CreateSuperHeroDto } from './dto/create-superhero.dto';
import { SuperHero } from '../../common/types/shared.types';

@Injectable()
export class SuperheroRepository {
  private db: SuperHero[] = [];

  constructor() {}

  /**
   * Creates a new superhero and adds it to the database.
   * @param superhero - The superhero data to create.
   * @returns The created superhero.
   */
  create(superhero: SuperHero): SuperHero {
    this.db.push(superhero);
    return superhero;
  }

  /**
   * Checks if a superhero with the given name already exists in the database.
   * @param superhero - The superhero data to check for existence.
   * @returns `true` if a superhero with the same name already exists, `false` otherwise.
   */
  itExists(superhero: Omit<SuperHero, 'created_at'>): boolean {
    return this.db.some(
      (existingSuperhero) =>
        existingSuperhero.name.trim().toLowerCase() ===
        superhero.name.trim().toLowerCase(),
    );
  }

  /**
   * Retrieves all superhero data from the database.
   * @returns An array of `CreateSuperHeroDto` objects representing all superheros in the database.
   */
  findAll(): SuperHero[] {
    return this.db;
  }

  /**
   * Retrieves a paginated list of superheroes from the database.
   * @param page - The current page number to retrieve.
   * @param limit - The number of superheroes to return per page.
   * @returns An object containing the current page, total pages, total count, and the paginated data.
   */
  findMany(
    page: number,
    limit: number,
  ): {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    data: CreateSuperHeroDto[];
  } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = this.db.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.db.length / limit);
    return {
      currentPage: page,
      totalPages,
      totalCount: this.db.length,
      data: paginatedData,
    };
  }
}
