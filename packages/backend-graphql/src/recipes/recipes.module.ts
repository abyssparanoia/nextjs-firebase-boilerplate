import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipes.resolver';

@Module({
  providers: [RecipesResolver]
})
export class RecipesModule {}
