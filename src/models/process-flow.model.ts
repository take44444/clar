import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProcessModel } from "./process.model";
import { ProjectModel } from "./project.model";

@ObjectType()
export class ProcessFlowModel {
  @Field((type) => ID)
  id?: number;

  @Field((type) => String)
  name?: string;

  @Field((type) => [ProcessModel])
  process?: ProcessModel[];

  @Field((type) => ProjectModel)
  project?: ProjectModel;
}