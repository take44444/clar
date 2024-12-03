import { Injectable } from '@nestjs/common';
import { FieldMap } from '@jenyus-org/graphql-utils';
import { GraphTraversalRepository, IRepository } from './repository';
import { ProcessModel } from '@/models/process.model';

@Injectable()
export class ProcessRepository extends GraphTraversalRepository<ProcessModel> implements IRepository<ProcessModel> {
  async find(fieldMap: FieldMap, id?: number): Promise<ProcessModel[]> {
    return this.graphTraversal(ProcessModel, fieldMap, id);
  }

  async create(model: ProcessModel, fieldMap: FieldMap): Promise<ProcessModel> {
    return;
  }

  async delete(model: ProcessModel, fieldMap: FieldMap): Promise<ProcessModel> {
    return;
  }
}