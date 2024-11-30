import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TaskRefModel } from "./task-ref.model";
import { RoleRefModel } from "./role-ref.model";

@ObjectType()
export class UserModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => [RoleRefModel], { defaultValue: [] })
  roles: RoleRefModel[];

  @Field((type) => [TaskRefModel], { defaultValue: [] })
  tasks: TaskRefModel[];
}