import { Field, ID, ObjectType } from "@nestjs/graphql";
import { RoleModel } from "./role.model";
import { TaskModel } from "./task.model";

@ObjectType()
export class UserModel {
  @Field((type) => ID)
  id?: number;

  @Field((type) => String)
  name?: string;
}

@ObjectType()
export class UserFullModel {
  @Field((type) => ID)
  id?: number;

  @Field((type) => String)
  name?: string;

  @Field((type) => String)
  password?: string;

  @Field((type) => [RoleModel])
  role?:RoleModel[];

  @Field((type) => [TaskModel])
  task?:TaskModel[];
}