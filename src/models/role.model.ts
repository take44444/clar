import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RoleModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;
}