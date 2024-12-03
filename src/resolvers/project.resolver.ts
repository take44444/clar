import { CreateProjectInput } from "@/dto/project.dto";
import { ProjectModel } from "@/models/project.model";
import { ProjectService } from "@/services/project.service";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { FieldMap as InfoMap } from "@jenyus-org/nestjs-graphql-utils";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver((of) => ProjectModel)
export class ProjectResolver {
  constructor(
    private projectService: ProjectService
  ) {}

  @Query((returns) => ProjectModel, { nullable: true })
  async project(
    @Args("id", { type: () => Int }) id: number,
    @InfoMap() fieldMap: FieldMap
  ) {
    return this.projectService.findOne(id, fieldMap);
  }

  // @Query((returns) => [ProjectModel])
  // async projects(
  //   @InfoMap() fieldMap: FieldMap
  // ) {
  //   return this.projectService.findAll(fieldMap);
  // }

  // @Mutation((returns) => ProjectModel)
  // async createProject(
  //   @Args("project") project: CreateProjectInput,
  //   @InfoMap() fieldMap: FieldMap
  // ) {
  //   return await this.projectService.create(project, fieldMap);
  // }

  // @Mutation((returns) => ProjectModel, { nullable: true })
  // async deleteProject(
  //   @Args("id", { type: () => Int }) id: number,
  //   @InfoMap() fieldMap: FieldMap
  // ) {
  //   return await this.projectService.delete(id, fieldMap);
  // }
}

