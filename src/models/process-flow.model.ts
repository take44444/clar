import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProcessModel } from "./process.model";
import { ProcessRefModel } from "./process-ref.model";
import { ProjectRefModel } from "./project-ref.model";

@ObjectType()
export class ProcessFlowModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => ProjectRefModel)
  project: ProjectRefModel;

  @Field((type) => ProcessRefModel)
  start: ProcessRefModel;

  @Field((type) => [ProcessModel], { defaultValue: [] })
  processes: ProcessModel[];
}