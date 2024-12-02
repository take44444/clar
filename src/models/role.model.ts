import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProcessModel } from "./process.model";
import { ProjectModel } from "./project.model";
import { UserModel } from "./user.model";

@ObjectType()
export class RoleModel {
  @Field((type) => ID)
  id?: number;

  @Field((type) => String)
  name?: string;

  @Field((type) => ProjectModel)
  project?: ProjectModel;

  @Field((type) => [ProcessModel])
  process?: ProcessModel[];

  @Field((type) => [UserModel])
  user?: UserModel[];
}
