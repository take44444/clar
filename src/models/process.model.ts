import { Field, ID, ObjectType } from "@nestjs/graphql";
import { RoleRefModel } from "./role-ref.model";
import { ProcessRefModel } from "./process-ref.model";

@ObjectType()
export class ProcessModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => [ProcessRefModel], { defaultValue: [] })
  from: ProcessRefModel[];

  @Field((type) => [ProcessRefModel], { defaultValue: [] })
  to: ProcessRefModel[];

  @Field((type) => [RoleRefModel], { defaultValue: [] })
  users: RoleRefModel[];
}