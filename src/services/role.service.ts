import { Inject, Injectable } from "@nestjs/common";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { IRepository } from "@/repository/repository";
import { RoleModel } from "@/models/role.model";
import { RoleRepository } from "@/repository/role.repository";

@Injectable()
export class RoleService {
  constructor(
    @Inject(RoleRepository)
    private projectRepository: IRepository<RoleModel>
  ) {}

  async findOne(id: number, fieldMap: FieldMap): Promise<RoleModel> {
    const ret = await this.projectRepository.find(fieldMap, id);
    if (!ret.length) return;
    return ret[0];
  }

  async findAll(fieldMap: FieldMap): Promise<RoleModel[]> {
    return await this.projectRepository.find(fieldMap);
  }

  // async create(createRoleInput: CreateRoleInput, fieldMap: FieldMap) {
  // }

  // async delete(id: number, fieldMap: FieldMap) {
  // }
}
