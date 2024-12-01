import { ProjectModel } from "@/models/project.model";
import { Injectable } from "@nestjs/common";
import { GremlinService } from "./gremlin.service";
import * as gremlin from 'gremlin';
import { CreateProjectInput } from "@/dto/project.dto";

@Injectable()
export class ProjectService {
  constructor(private gremlinService: GremlinService) {}

  async findOne(id: number) {
    const project = (await this.gremlinService.g.V(id).elementMap().next()).value;
    if (project === null) return;
    const ret: ProjectModel = {
      id: project.get(gremlin.process.t.id),
      name: project.get("name"),
    };
    return ret;
  }

  async findAll() {
    const projects: ProjectModel[] = new Array();
    for await (const project of this.gremlinService.g.V().hasLabel('project').elementMap()) {
      projects.push({
        id: project.get(gremlin.process.t.id),
        name: project.get("name"),
      })
    }
    return projects;
  }

  async create(createProjectInput: CreateProjectInput) {
    const project = (await this.gremlinService.g.addV('project').property('name', createProjectInput.name).elementMap().next()).value;
    const ret: ProjectModel = {
      id: project.get(gremlin.process.t.id),
      name: project.get("name"),
    };
    return ret;
  }

  async delete(id: number) {
    const project = this.findOne(id);
    if (project === null) return;
    await this.gremlinService.g.V(id).drop().next();
    return project;
  }
}
