import { Injectable } from '@nestjs/common';
import { FieldMap } from '@jenyus-org/graphql-utils';
import { GraphTraversalRepository, IRepository } from './repository';
import { UserModel } from '@/models/user.model';

@Injectable()
export class UserRepository extends GraphTraversalRepository<UserModel> implements IRepository<UserModel> {
  async find(fieldMap: FieldMap, id?: number): Promise<UserModel[]> {
    return this.graphTraversal(UserModel, fieldMap, id);
  }

  async create(model: UserModel, fieldMap: FieldMap): Promise<UserModel> {
    return;
  }

  async delete(model: UserModel, fieldMap: FieldMap): Promise<UserModel> {
    return;
  }
}