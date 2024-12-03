import { Inject, Injectable } from "@nestjs/common";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { IRepository } from "@/repository/repository";
import { ProcessModel } from "@/models/process.model";
import { ProcessRepository } from "@/repository/process.repository";

@Injectable()
export class ProcessService {
  constructor(
    @Inject(ProcessRepository)
    private projectRepository: IRepository<ProcessModel>
  ) {}

  async findOne(id: number, fieldMap: FieldMap): Promise<ProcessModel> {
    const ret = await this.projectRepository.find(fieldMap, id);
    if (!ret.length) return;
    return ret[0];
  }

  async findAll(fieldMap: FieldMap): Promise<ProcessModel[]> {
    return await this.projectRepository.find(fieldMap);
  }

  // async create(createProcessInput: CreateProcessInput, fieldMap: FieldMap) {
  // }

  // async delete(id: number, fieldMap: FieldMap) {
  // }
}
