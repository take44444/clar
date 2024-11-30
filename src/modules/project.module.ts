import { ProjectResolver } from "@/resolvers/project.resolver";
import { GremlinService } from "@/services/gremlin.service";
import { ProjectService } from "@/services/project.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  providers: [ProjectService, ProjectResolver, GremlinService],
  exports: [ProjectService],
})
export class ProjectModule {}