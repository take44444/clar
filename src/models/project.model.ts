import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProjectModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;
}