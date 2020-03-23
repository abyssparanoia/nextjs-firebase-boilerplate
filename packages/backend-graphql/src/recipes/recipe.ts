import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Recipe {
  @Field(() => ID)
  id: string

  @Field()
  title: string
}
