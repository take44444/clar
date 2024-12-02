import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProcessFlowModel } from "./process-flow.model";
import { RoleModel } from "./role.model";

@ObjectType()
export class ProjectModel {
  @Field((type) => ID)
  id?: number;

  @Field((type) => String)
  name?: string;

  @Field((type) => ProcessFlowModel)
  processFlow?: ProcessFlowModel;

  @Field((type) => [RoleModel])
  role?: RoleModel[];
}