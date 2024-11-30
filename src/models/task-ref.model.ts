import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProcessRefModel } from "./process-ref.model";

@ObjectType()
export class TaskRefModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => ProcessRefModel)
  process: ProcessRefModel;
}