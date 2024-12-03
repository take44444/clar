import { Injectable } from '@nestjs/common';
import { FieldMap } from '@jenyus-org/graphql-utils';
import { GraphTraversalRepository, IRepository } from './repository';
import { RoleModel } from '@/models/role.model';

@Injectable()
export class RoleRepository extends GraphTraversalRepository<RoleModel> implements IRepository<RoleModel> {
  async find(fieldMap: FieldMap, id?: number): Promise<RoleModel[]> {
    return this.graphTraversal(RoleModel, fieldMap, id);
  }

  async create(model: RoleModel, fieldMap: FieldMap): Promise<RoleModel> {
    return;
  }

  async delete(model: RoleModel, fieldMap: FieldMap): Promise<RoleModel> {
    return;
  }
}