import { Resolver, Query } from '@nestjs/graphql'
import { Recipe } from './recipe'

const recipeTable = [
  {
    id: '1',
    title: '鯖の味噌煮'
  },
  {
    id: '2',
    title: 'ミートソーススパゲティ'
  },
  {
    id: '3',
    title: '豚の生姜焼'
  }
]

@Resolver('Recipes')
export class RecipesResolver {
  @Query(() => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return recipeTable
  }
}
