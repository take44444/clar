import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TaskModel } from "./task.model";

@ObjectType()
export class ProcessModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => [TaskModel], { defaultValue: [] })
  from: TaskModel[];
}