import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PermissionModel } from "./permission.model";
import { ProjectRefModel } from "./project-ref.model";
import { UserRefModel } from "./user-ref.model";

@ObjectType()
export class RoleModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => ProjectRefModel)
  project: ProjectRefModel;

  @Field((type) => [UserRefModel], { defaultValue: [] })
  users: UserRefModel[];

  @Field((type) => [PermissionModel], { defaultValue: [] })
  permissions: PermissionModel[];
}