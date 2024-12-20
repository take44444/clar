import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProcessFlowModel } from "./process-flow.model";
import { RoleModel } from "./role.model";
import { TaskModel } from "./task.model";

@ObjectType()
export class ProcessModel {
  @Field((type) => ID)
  id?: number;

  @Field((type) => String)
  name?: string;

  @Field((type) => ProcessFlowModel)
  processFlow?: ProcessFlowModel;

  @Field((type) => RoleModel)
  role?: RoleModel;

  @Field((type) => [TaskModel])
  task?: TaskModel[];
}