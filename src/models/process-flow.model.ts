import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProcessFlowModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  projectId: number;

  @Field((type) => Int)
  startProcessId: number;
}