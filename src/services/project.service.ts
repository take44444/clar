import { ProjectModel } from "@/models/project.model";
import { Inject, Injectable } from "@nestjs/common";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { IRepository } from "@/repository/repository";
import { ProjectRepository } from "@/repository/project.repository";

@Injectable()
export class ProjectService {
  constructor(
    @Inject(ProjectRepository)
    private projectRepository: IRepository<ProjectModel>
  ) {}

  async findOne(id: number, fieldMap: FieldMap): Promise<ProjectModel> {
    const ret = await this.projectRepository.find(fieldMap, id);
    if (!ret.length) return;
    return ret[0];
  }

  async findAll(fieldMap: FieldMap): Promise<ProjectModel[]> {
    return await this.projectRepository.find(fieldMap);
  }

  // async create(createProjectInput: CreateProjectInput, fieldMap: FieldMap) {
  // }

  // async delete(id: number, fieldMap: FieldMap) {
  // }
}
