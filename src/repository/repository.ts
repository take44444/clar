import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { FieldMap } from '@jenyus-org/graphql-utils';
import * as gremlin from 'gremlin';
import { ProcessFlowModel } from "@/models/process-flow.model";
import { ProcessModel } from "@/models/process.model";
import { ProjectModel } from '@/models/project.model';
import { RoleModel } from "@/models/role.model";
import { TaskModel } from "@/models/task.model";
import { UserModel } from "@/models/user.model";

export interface IRepository<M> {
  find(fieldMap: FieldMap, id?: number): Promise<M[]>;
  create(model: M, fieldMap: FieldMap): Promise<M>;
  delete(model: M, fieldMap: FieldMap): Promise<M>;
}

@Injectable()
export class GremlinRepository implements OnModuleInit, OnModuleDestroy {
  dc: gremlin.driver.DriverRemoteConnection
  g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>

  async onModuleInit() {
    this.dc = new gremlin.driver.DriverRemoteConnection('ws://localhost:8182/gremlin', {});
    const graph = new gremlin.structure.Graph();
    this.g = graph.traversal().withRemote(this.dc);
  }

  async onModuleDestroy() {
    this.dc.close();
  }
}

@Injectable()
export class GraphTraversalRepository<M> {
  constructor(private gremlinRepository: GremlinRepository) {}

  async createTestData(): Promise<number[]> {
    const ret: number[] = new Array();

    this.gremlinRepository.g.V().drop();

    const id: number = (await this.gremlinRepository.g
      .addV('project').property('name','clar').elementMap().next()
    ).value.get(gremlin.process.t.id);

    await this.gremlinRepository.g
      .V(id).as('p')
      .addV('role').property('name','Product Owner').as('r1').addV('role').property('name','Business Analyst').as('r2').addV('role').property('name','Architecture').as('r3')
      .addV('user').property('name','Alice').as('u1').addV('user').property('name','Bob').as('u2').addV('user').property('name','Charlie').as('u3')
      .addE('has').from_('p').to('r1').addE('has').from_('p').to('r2').addE('has').from_('p').to('r3')
      .addE('assigned').from_('u1').to('r1').addE('assigned').from_('u2').to('r2').addE('assigned').from_('u3').to('r2')
      .next();

    ret.push(id);
    return ret;
  }

  // build query by DFS GraphQL query
  async buildGremlinQuery(fieldMap: FieldMap, id?: number): Promise<any> {
    let data_name = Object.keys(fieldMap)[0];
    let graphTraversal: gremlin.process.GraphTraversal;
    if (id === undefined) graphTraversal = this.gremlinRepository.g.V().hasLabel(data_name);
    else graphTraversal = this.gremlinRepository.g.V(id);

    const queryMap: Map<string, any> = new Map();
    const stack: [
      boolean, // if it is preorder
      string, // label
      FieldMap, // field map
      Map<string, any>, // query map
    ][] = new Array();

    stack.push([false, data_name, fieldMap[data_name], queryMap]);
    stack.push([true, data_name, fieldMap[data_name], queryMap]);
    while (stack.length) {
      const [go, label, fm, qm] = stack.pop();
      if (go) {
        for (const key in fm) {
          switch (key) {
          case "id":
            qm.set("id", new Map([["@traversal", gremlin.process.t.id]]));
            break;
          case "name":
            qm.set("name", new Map([["@traversal", "name"]]));
            break;
          default:
            const qmC: Map<string, any> = new Map();
            qm.set(key, qmC);
            stack.push([false, key, fm[key], qmC]);
            stack.push([true, key, fm[key], qmC]);
          }
        }
      } else {
        let gt: gremlin.process.GraphTraversal;
        if (!stack.length) gt = graphTraversal;
        else gt = gremlin.process.statics.both().hasLabel(label);
        gt = gt.project(...qm.keys());
        for (const key in fm) gt = gt.by(qm.get(key).get("@traversal"));
        qm.set("@traversal", gt.fold());
      }
    }
    return (await queryMap.get("@traversal").next()).value;
  }

  async graphTraversal(Model: { new(): M ;}, fieldMap: FieldMap, id?: number): Promise<M[]> {
    //////////////////////////////////////////////////////////////////////////
    id = (await this.createTestData())[0];
    //////////////////////////////////////////////////////////////////////////

    const rootData = await this.buildGremlinQuery(fieldMap, id);
    const ret: M[] = new Array();
    const stack: [
      any, // data
      any, // model
    ][] = new Array();
    for (const data of rootData) {
      const model = new Model();
      ret.push(model);
      stack.push([data, model]);
    }
    while (stack.length) {
      const [data, m] = stack.pop();
      switch (true) {
      case m instanceof ProjectModel:
        for (const entry of data.entries()) {
          switch (entry[0]) {
          case "id":
            m.id = entry[1];
            break;
          case "name":
            m.name = entry[1];
            break;
          case "processFlow":
            const processFlow = new ProcessFlowModel();
            m.processFlow = processFlow;
            stack.push([entry[1][0], processFlow]);
            break;
          case "role":
            m.role = [];
            for (const role_data of entry[1]) {
              const role = new RoleModel();
              m.role.push(role);
              stack.push([role_data, role]);
            }
            break;
          default:
            throw new Error("Unexpected error!");
          }
        }
        break;
      case m instanceof RoleModel:
        for (const entry of data.entries()) {
          switch (entry[0]) {
          case "id":
            m.id = entry[1];
            break;
          case "name":
            m.name = entry[1];
            break;
          case "process":
            m.process = [];
            for (const process_data of entry[1]) {
              const process = new ProcessModel();
              m.process.push(process);
              stack.push([process_data, process]);
            }
            break;
          case "project":
            const project = new ProjectModel();
            m.project = project;
            stack.push([entry[1][0], project]);
            break;
          case "user":
            m.user = [];
            for (const user_data of entry[1]) {
              const user = new UserModel();
              m.user.push(user);
              stack.push([user_data, user]);
            }
            break;
          default:
            throw new Error("Unexpected error!");
          }
        }
        break;
      case m instanceof UserModel:
        for (const entry of data.entries()) {
          switch (entry[0]) {
          case "id":
            m.id = entry[1];
            break;
          case "name":
            m.name = entry[1];
            break;
          default:
            throw new Error("Unexpected error!");
          }
        }
        break;
      case m instanceof ProcessFlowModel:
        for (const entry of data.entries()) {
          switch (entry[0]) {
          case "id":
            m.id = entry[1];
            break;
          case "name":
            m.name = entry[1];
            break;
          case "process":
            m.process = [];
            for (const process_data of entry[1]) {
              const process = new ProcessModel();
              m.process.push(process);
              stack.push([process_data, process]);
            }
            break;
          case "project":
            const project = new ProjectModel();
            m.project = project;
            stack.push([entry[1][0], project]);
            break;
          default:
            throw new Error("Unexpected error!");
          }
        }
        break;
      case m instanceof ProcessModel:
        for (const entry of data.entries()) {
          switch (entry[0]) {
          case "id":
            m.id = entry[1];
            break;
          case "name":
            m.name = entry[1];
            break;
          case "processFlow":
            const processFlow = new ProcessFlowModel();
            m.processFlow = processFlow;
            stack.push([entry[1][0], processFlow]);
            break;
          case "role":
            const role = new RoleModel();
            m.role = role;
            stack.push([entry[1][0], role]);
            break;
          default:
            throw new Error("Unexpected error!");
          }
        }
        break;
      case m instanceof TaskModel:
        for (const entry of data.entries()) {
          switch (entry[0]) {
          case "id":
            m.id = entry[1];
            break;
          case "name":
            m.name = entry[1];
            break;
          case "process":
            const process = new ProcessModel();
            m.process = process;
            stack.push([entry[1][0], process]);
            break;
          case "user":
            m.user = [];
            for (const user_data of entry[1]) {
              const user = new UserModel();
              m.user.push(user);
              stack.push([user_data, user]);
            }
            break;
          default:
            throw new Error("Unexpected error!");
          }
        }
        break;
      default:
        throw new Error("Unexpected error!");
      }
    }
    return ret;
  }
}