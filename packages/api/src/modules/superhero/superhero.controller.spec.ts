import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { SuperheroRepository } from './superhero.repository';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { CreateSuperHeroDto } from './dto/create-superhero.dto';
Response;
import { CreateSuperHero, Response } from '../../common/types/shared.types';

describe('SuperheroController', () => {
  let controller: SuperheroController;
  let service: SuperheroService;

  const mockSuperhero = {
    name: 'Test Hero',
    superpower: 'Testing',
    humilityScore: 8,
  };

  const mockCreatedSuperhero = {
    ...mockSuperhero,
    created_at: '2024-01-31T15:38:18.542Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
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

    controller = module.get<SuperheroController>(SuperheroController);
    service = module.get<SuperheroService>(SuperheroService);
  });
  /**
   * Describes the test suite for the `createSuperhero` method of the `SuperheroController` class.
   * This test suite verifies the behavior of the `createSuperhero` method, which is responsible for
   * handling the creation of new superheroes.
   */
  describe('createSuperhero', () => {
    /**
     * Describes a test case for the `createSuperhero` controller.
     * This test case verifies that the `createSuperhero` controller correctly handles the creation of a new superhero.
     */
    it('creates a new superhero successfully', () => {
      jest
        .spyOn(service, 'createSuperhero')
        .mockReturnValue(mockCreatedSuperhero);

      const result = controller.createSuperhero(mockSuperhero);

      // Assert that the result is a Response object with the expected properties
      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Superhero created successfully',
        data: mockCreatedSuperhero,
      });
      expect(service.createSuperhero).toHaveBeenCalledWith(mockSuperhero);
    });

    /**
     * Describes a test case for the `createSuperhero` controller,
     * when a superhero already exists.
     */
    it('throws conflict exception when superhero already exists', () => {
      jest.spyOn(service, 'createSuperhero').mockImplementation(() => {
        throw new HttpException(
          'Superhero already exists',
          HttpStatus.CONFLICT,
        );
      });

      expect(() => controller.createSuperhero(mockSuperhero)).toThrow(
        new HttpException('Superhero already exists', HttpStatus.CONFLICT),
      );
    });

    it('validates superhero name is not empty', () => {
      const invalidSuperhero = { ...mockSuperhero, name: '' };

      const validationPipe = new ValidationPipe();

      expect(
        validationPipe.transform(invalidSuperhero, {
          type: 'body',
          metatype: CreateSuperHeroDto,
        }),
      ).rejects.toThrow();
    });

    it('validates humility score is between 1 and 10', () => {
      const invalidSuperhero = { ...mockSuperhero, humilityScore: 11 };
      const validationPipe = new ValidationPipe();

      expect(
        validationPipe.transform(invalidSuperhero, {
          type: 'body',
          metatype: CreateSuperHeroDto,
        }),
      ).rejects.toThrow();
    });
  });

  describe('input validation', () => {
    it('validates all required fields are present', () => {
      const incompleteSuperhero = {
        name: 'Test Hero',
      };
      const validationPipe = new ValidationPipe();

      expect(
        validationPipe.transform(incompleteSuperhero, {
          type: 'body',
          metatype: CreateSuperHeroDto,
        }),
      ).rejects.toThrow();
    });

    it('validates superpower is a string', () => {
      const invalidSuperhero = {
        ...mockSuperhero,
        superpower: 123,
      };

      const validationPipe = new ValidationPipe();

      expect(
        validationPipe.transform(invalidSuperhero, {
          type: 'body',
          metatype: CreateSuperHeroDto,
        }),
      ).rejects.toThrow();
    });
  });
});
