import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TaskModel } from "./task.model";
import { RoleModel } from "./role.model";

@ObjectType()
export class UserModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => [RoleModel], { defaultValue: [] })
  roles: RoleModel[];

  @Field((type) => [TaskModel], { defaultValue: [] })
  tasks: TaskModel[];
}