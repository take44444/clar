import { Field, ID, ObjectType } from "@nestjs/graphql";
import { MemberModel } from "./member.model";

@ObjectType()
export class ProjectModel {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => [MemberModel], { defaultValue: [] })
  members: MemberModel[];
}