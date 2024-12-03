import { Injectable } from '@nestjs/common';
import { FieldMap } from '@jenyus-org/graphql-utils';
import { GraphTraversalRepository, IRepository } from './repository';
import { ProcessFlowModel } from '@/models/process-flow.model';

@Injectable()
export class ProcessFlowRepository extends GraphTraversalRepository<ProcessFlowModel> implements IRepository<ProcessFlowModel> {
  async find(fieldMap: FieldMap, id?: number): Promise<ProcessFlowModel[]> {
    return this.graphTraversal(ProcessFlowModel, fieldMap, id);
  }

  async create(model: ProcessFlowModel, fieldMap: FieldMap): Promise<ProcessFlowModel> {
    return;
  }

  async delete(model: ProcessFlowModel, fieldMap: FieldMap): Promise<ProcessFlowModel> {
    return;
  }
}