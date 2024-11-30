import { Field, ID, ObjectType } from "@nestjs/graphql";
import { MemberRefModel } from "./member-ref.model";
import { ProcessRefModel } from "./process-ref.model";

@ObjectType()
export class TaskModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => ProcessRefModel)
  process: ProcessRefModel;

  @Field((type) => [MemberRefModel], { defaultValue: [] })
  members: MemberRefModel[];
}