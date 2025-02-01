import { CreateSuperHeroDto } from '../../modules/superhero/dto/create-superhero.dto';

export interface Response<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export type CreateSuperHero = CreateSuperHeroDto & {
  created_at: string;
};
