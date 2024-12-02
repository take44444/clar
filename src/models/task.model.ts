import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProcessModel } from "./process.model";
import { UserModel } from "./user.model";

@ObjectType()
export class TaskModel {
  @Field((type) => ID)
  id?: number;

  @Field((type) => String)
  name?: string;

  @Field((type) => ProcessModel)
  process?: ProcessModel;

  @Field((type) => [UserModel])
  user?: UserModel[];
}
