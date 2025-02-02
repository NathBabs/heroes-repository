import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { SuperheroRepository } from './superhero.repository';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { CreateSuperHeroDto } from './dto/create-superhero.dto';

describe('SuperheroController', () => {
  let controller: SuperheroController;
  let service: SuperheroService;

  /**
   * A mock superhero object used for testing purposes.
   * this object represents the data that will be sent to the
   * POST - /superheroes route.
   * */
  const mockSuperhero = {
    name: 'Test Hero',
    superpower: 'Testing',
    humilityScore: 8,
  };

  /**
   * A mock superhero object that represents a newly created superhero, with the `created_at` property added.
   */
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
            create: jest.fn(), // mock the create method of the SuperheroRepository
            itExists: jest.fn(), // mock the itExists method of the SuperheroRepository
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

      /**
       * Verifies that the `createSuperhero` controller throws a `HttpException` with a 'Superhero already exists' message and a `HttpStatus.CONFLICT` status code when a superhero already exists.
       */
      expect(() => controller.createSuperhero(mockSuperhero)).toThrow(
        new HttpException('Superhero already exists', HttpStatus.CONFLICT),
      );
    });

    it('validates superhero name is not empty', () => {
      const invalidSuperhero = { ...mockSuperhero, name: '' };

      /**
       * Verifies that the `validationPipe` correctly rejects an invalid superhero object with an empty name.
       */
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

      /**
       * Verifies that the `validationPipe` correctly rejects an invalid superhero object with an invalid hulimity score value.
       */
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

      /**
       * Verifies that the `validationPipe` correctly rejects an incomplete superhero object with missing required fields.
       */
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

      /**
       * Verifies that the `validationPipe` correctly rejects an invalid superhero object a superpower value that is not a string.
       */
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
