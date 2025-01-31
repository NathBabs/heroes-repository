import { CreateSuperHeroDto } from '../../modules/superhero/dto/create-superhero.dto';

export interface Response<T> {
  data: T;
}

export type CreateSuperHero = CreateSuperHeroDto & {
  created_at: string;
};
