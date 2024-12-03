import { Inject, Injectable } from "@nestjs/common";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { IRepository } from "@/repository/repository";
import { TaskModel } from "@/models/task.model";
import { TaskRepository } from "@/repository/task.repository";

@Injectable()
export class TaskService {
  constructor(
    @Inject(TaskRepository)
    private projectRepository: IRepository<TaskModel>
  ) {}

  async findOne(id: number, fieldMap: FieldMap): Promise<TaskModel> {
    const ret = await this.projectRepository.find(fieldMap, id);
    if (!ret.length) return;
    return ret[0];
  }

  async findAll(fieldMap: FieldMap): Promise<TaskModel[]> {
    return await this.projectRepository.find(fieldMap);
  }

  // async create(createTaskInput: CreateTaskInput, fieldMap: FieldMap) {
  // }

  // async delete(id: number, fieldMap: FieldMap) {
  // }
}
