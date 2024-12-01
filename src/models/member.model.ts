import { Field, ID, ObjectType } from "@nestjs/graphql";
import { RoleRefModel } from "./role-ref.model";
import { TaskRefModel } from "./task-ref.model";
import { UserRefModel } from "./user-ref.model";

@ObjectType()
export class MemberModel {
  @Field((type) => UserRefModel)
  user: UserRefModel;

  @Field((type) => [RoleRefModel], { defaultValue: [] })
  roles: RoleRefModel[];

  @Field((type) => [TaskRefModel], { defaultValue: [] })
  tasks: TaskRefModel[];
}