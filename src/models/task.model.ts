import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TaskModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  processId: number;

  @Field((type) => Int)
  userId: number;
}