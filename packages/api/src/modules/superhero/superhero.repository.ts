import { Injectable } from '@nestjs/common';
import { CreateSuperHeroDto } from './dto/create-superhero.dto';
import { CreateSuperHero } from '../../common/types/shared.types';

@Injectable()
export class SuperheroRepository {
  private db: CreateSuperHero[] = [];

  constructor() {}

  /**
   * Creates a new superhero and adds it to the database.
   * @param superhero - The superhero data to create.
   * @returns The created superhero.
   */
  create(superhero: CreateSuperHero): CreateSuperHero {
    this.db.push(superhero);
    return superhero;
  }

  itExists(superhero: Omit<CreateSuperHero, 'created_at'>): boolean {
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
  findAll(): CreateSuperHero[] {
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
