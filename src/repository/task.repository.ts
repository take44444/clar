import { Injectable } from '@nestjs/common';
import { FieldMap } from '@jenyus-org/graphql-utils';
import { GraphTraversalRepository, IRepository } from './repository';
import { TaskModel } from '@/models/task.model';

@Injectable()
export class TaskRepository extends GraphTraversalRepository<TaskModel> implements IRepository<TaskModel> {
  async find(fieldMap: FieldMap, id?: number): Promise<TaskModel[]> {
    return this.graphTraversal(TaskModel, fieldMap, id);
  }

  async create(model: TaskModel, fieldMap: FieldMap): Promise<TaskModel> {
    return;
  }

  async delete(model: TaskModel, fieldMap: FieldMap): Promise<TaskModel> {
    return;
  }
}