import { Module } from "@nestjs/common";
import { GremlinRepository } from "@/repository/repository";
import { ProjectRepository } from "@/repository/project.repository";
import { ProjectService } from "@/services/project.service";
import { ProjectResolver } from "@/resolvers/project.resolver";

@Module({
  imports: [],
  providers: [ProjectService, ProjectResolver, ProjectRepository, GremlinRepository],
  exports: [ProjectService],
})
export class ProjectModule {}