import { ProjectModel } from "@/models/project.model";
import { ProjectService } from "@/services/project.service";
import { Inject } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver((of) => ProjectModel)
export class ProjectResolver {
  constructor(@Inject(ProjectService) private projectService: ProjectService) {}

  @Query((returns) => ProjectModel, { nullable: true })
  async project() {
    return this.projectService.project();
  }
}

