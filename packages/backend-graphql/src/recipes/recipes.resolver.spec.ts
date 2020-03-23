import { Test, TestingModule } from '@nestjs/testing';
import { RecipesResolver } from './recipes.resolver';

describe('RecipesResolver', () => {
  let resolver: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesResolver],
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
