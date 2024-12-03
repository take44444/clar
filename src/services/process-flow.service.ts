import { Inject, Injectable } from "@nestjs/common";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { IRepository } from "@/repository/repository";
import { ProcessFlowModel } from "@/models/process-flow.model";
import { ProcessFlowRepository } from "@/repository/process-flow.repository";

@Injectable()
export class ProcessFlowService {
  constructor(
    @Inject(ProcessFlowRepository)
    private projectRepository: IRepository<ProcessFlowModel>
  ) {}

  async findOne(id: number, fieldMap: FieldMap): Promise<ProcessFlowModel> {
    const ret = await this.projectRepository.find(fieldMap, id);
    if (!ret.length) return;
    return ret[0];
  }

  async findAll(fieldMap: FieldMap): Promise<ProcessFlowModel[]> {
    return await this.projectRepository.find(fieldMap);
  }

  // async create(createProcessFlowInput: CreateProcessFlowInput, fieldMap: FieldMap) {
  // }

  // async delete(id: number, fieldMap: FieldMap) {
  // }
}
