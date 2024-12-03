import { Inject, Injectable } from "@nestjs/common";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { IRepository } from "@/repository/repository";
import { UserModel } from "@/models/user.model";
import { UserRepository } from "@/repository/user.repository";

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private projectRepository: IRepository<UserModel>
  ) {}

  async findOne(id: number, fieldMap: FieldMap): Promise<UserModel> {
    const ret = await this.projectRepository.find(fieldMap, id);
    if (!ret.length) return;
    return ret[0];
  }

  async findAll(fieldMap: FieldMap): Promise<UserModel[]> {
    return await this.projectRepository.find(fieldMap);
  }

  // async create(createUserInput: CreateUserInput, fieldMap: FieldMap) {
  // }

  // async delete(id: number, fieldMap: FieldMap) {
  // }
}
