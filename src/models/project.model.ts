import { Field, ID, ObjectType } from "@nestjs/graphql";
import { RoleModel } from "./role.model";

@ObjectType()
export class ProjectModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => [RoleModel], { defaultValue: [] })
  roles: RoleModel[];
}