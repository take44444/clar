import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProcessModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  processFlowId: number;
}