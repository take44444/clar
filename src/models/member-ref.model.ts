import { Field, ObjectType } from "@nestjs/graphql";
import { RoleRefModel } from "./role-ref.model";
import { UserRefModel } from "./user-ref.model";

@ObjectType()
export class MemberRefModel {
  @Field((type) => UserRefModel)
  user: UserRefModel;

  @Field((type) => [RoleRefModel], { defaultValue: [] })
  roles: RoleRefModel[];
}