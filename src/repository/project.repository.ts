import { Injectable } from '@nestjs/common';
import { FieldMap } from '@jenyus-org/graphql-utils';
import { GraphTraversalRepository, IRepository } from './repository';
import { ProjectModel } from '@/models/project.model';

@Injectable()
export class ProjectRepository extends GraphTraversalRepository<ProjectModel> implements IRepository<ProjectModel> {
  async find(fieldMap: FieldMap, id?: number): Promise<ProjectModel[]> {
    return this.graphTraversal(ProjectModel, fieldMap, id);
  }

  async create(model: ProjectModel, fieldMap: FieldMap): Promise<ProjectModel> {
    return;
  }

  async delete(model: ProjectModel, fieldMap: FieldMap): Promise<ProjectModel> {
    return;
  }
}