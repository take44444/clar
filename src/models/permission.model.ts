import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PermissionModel {
  @Field()
  name: string;
}