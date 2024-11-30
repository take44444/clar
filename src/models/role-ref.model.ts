import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProjectRefModel } from "./project-ref.model";

@ObjectType()
export class RoleRefModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => ProjectRefModel)
  project: ProjectRefModel;
}