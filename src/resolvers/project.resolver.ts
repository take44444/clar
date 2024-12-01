import { CreateProjectInput } from "@/dto/project.dto";
import { ProjectModel } from "@/models/project.model";
import { ProjectService } from "@/services/project.service";
import { Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver((of) => ProjectModel)
export class ProjectResolver {
  constructor(@Inject(ProjectService) private projectService: ProjectService) {}

  @Query((returns) => ProjectModel, { nullable: true })
  async project(@Args("id", { type: () => Int }) id: number) {
    return this.projectService.findOne(id);
  }

  @Query((returns) => [ProjectModel])
  async projects() {
    return this.projectService.findAll();
  }

  @Mutation((returns) => ProjectModel)
  async createProject(@Args("project") project: CreateProjectInput) {
    return await this.projectService.create(project);
  }

  @Mutation((returns) => ProjectModel, { nullable: true })
  async deleteProject(@Args("id", { type: () => Int }) id: number) {
    return await this.projectService.delete(id);
  }
}

