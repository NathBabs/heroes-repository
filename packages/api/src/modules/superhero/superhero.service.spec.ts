import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { SuperheroRepository } from './superhero.repository';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroService,
        {
          provide: SuperheroRepository,
          useValue: {
            create: jest.fn(),
            itExists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
