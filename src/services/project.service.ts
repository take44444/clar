import { ProjectModel } from "@/models/project.model";
import { Injectable } from "@nestjs/common";
import { GremlinService } from "./gremlin.service";
import * as gremlin from 'gremlin';
import { CreateProjectInput } from "@/dto/project.dto";
import { FieldMap } from "@jenyus-org/graphql-utils";
import { RoleModel } from "@/models/role.model";
import { UserModel } from "@/models/user.model";

@Injectable()
export class ProjectService {
  constructor(private gremlinService: GremlinService) {}

  async findOne(id_: number, fieldMap: FieldMap) {
    this.gremlinService.g.V().drop();
    const id = (await this.gremlinService.g
      .addV('project').property('name','clar').elementMap().next()
    ).value.get(gremlin.process.t.id);

    await this.gremlinService.g
      .V(id).as('p')
      .addV('role').property('name','Product Owner').as('r1').addV('role').property('name','Business Analyst').as('r2').addV('role').property('name','Architecture').as('r3')
      .addV('user').property('name','Alice').as('u1').addV('user').property('name','Bob').as('u2').addV('user').property('name','Charlie').as('u3')
      .addE('has').from_('p').to('r1').addE('has').from_('p').to('r2').addE('has').from_('p').to('r3')
      .addE('assigned').from_('u1').to('r1').addE('assigned').from_('u2').to('r2').addE('assigned').from_('u3').to('r2')
      .next();

    const graphTraversal: gremlin.process.GraphTraversal = this.gremlinService.g.V(id);
    const queryMap: Map<string, any> = new Map();
    const queryStack: Array<[
      boolean, // if it is preorder
      string, // label
      FieldMap,
      Map<string, any>, // query map
    ]> = new Array();

    // build query by DFS GraphQL query
    queryStack.push([false, "project", fieldMap["project"], queryMap]);
    queryStack.push([true, "project", fieldMap["project"], queryMap]);
    while (queryStack.length) {
      const [go, label, fm, qm] = queryStack.pop();
      if (go) {
        for (const key in fm) {
          if (key == "id") {
            qm.set("id", new Map([["@traversal", gremlin.process.t.id]]));
          } else if (key == "name") {
            qm.set("name", new Map([["@traversal", "name"]]));
          } else {
            const qmC: Map<string, any> = new Map();
            qm.set(key, qmC);
            queryStack.push([false, key, fm[key], qmC]);
            queryStack.push([true, key, fm[key], qmC]);
          }
        }
      } else {
        let gt: gremlin.process.GraphTraversal;
        if (!queryStack.length) {
          gt = graphTraversal;
        } else {
          gt = gremlin.process.statics.both().hasLabel(label);
        }
        gt = gt.project(...qm.keys());
        for (const key in fm) {
          gt = gt.by(qm.get(key).get("@traversal"));
        }
        gt = gt.fold();
        qm.set("@traversal", gt);
      }
    }
    const project_data = (await queryMap.get("@traversal").next()).value[0];
    const model = new ProjectModel();
    const modelStack: Array<[
      string, // label
      any,
      any, // model
    ]> = new Array();
    modelStack.push(["project", project_data, model]);
    while (modelStack.length) {
      const [label, data, m] = modelStack.pop();
      if (label == "project") {
        const project = m as ProjectModel;
        for (const entry of data.entries()) {
          if (entry[0] == "id") {
            project.id = entry[1];
          } else if (entry[0] == "name") {
            project.name = entry[1];
          } else if (entry[0] == "role") {
            project.role = [];
            for (const role of entry[1]) {
              const mC = new RoleModel();
              project.role.push(mC);
              modelStack.push(["role", role, mC]);
            }
          }
        }
      } else if (label == "role") {
        const role = m as RoleModel;
        for (const entry of data.entries()) {
          if (entry[0] == "id") {
            role.id = entry[1];
          } else if (entry[0] == "name") {
            role.name = entry[1];
          } else if (entry[0] == "user") {
            role.user = [];
            for (const user of entry[1]) {
              const mC = new UserModel();
              role.user.push(mC);
              modelStack.push(["user", user, mC]);
            }
          }
        }
      } else if (label == "user") {
        const user = m as UserModel;
        for (const entry of data.entries()) {
          if (entry[0] == "id") {
            user.id = entry[1];
          } else if (entry[0] == "name") {
            user.name = entry[1];
          }
        }
      }
    }

    return model;
  }

  // async findAll(fieldMap: FieldMap) {
  //   const projects: ProjectModel[] = new Array();
  //   for await (const project of this.gremlinService.g.V().hasLabel('project').elementMap()) {
  //     projects.push({
  //       id: project.get(gremlin.process.t.id),
  //       name: project.get("name"),
  //     })
  //   }
  //   return projects;
  // }

  // async create(createProjectInput: CreateProjectInput, fieldMap: FieldMap) {
  //   const project = (await this.gremlinService.g.addV('project').property('name', createProjectInput.name).elementMap().next()).value;
  //   const ret: ProjectModel = {
  //     id: project.get(gremlin.process.t.id),
  //     name: project.get("name"),
  //   };
  //   return ret;
  // }

  // async delete(id: number, fieldMap: FieldMap) {
  //   const project = this.findOne(id);
  //   if (project === null) return;
  //   await this.gremlinService.g.V(id).drop().next();
  //   return project;
  // }
}
