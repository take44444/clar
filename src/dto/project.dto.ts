import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProjectInput {
  @Field((type) => String)
  name!: string;
}