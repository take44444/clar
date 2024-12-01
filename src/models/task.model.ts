import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TaskModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;
}