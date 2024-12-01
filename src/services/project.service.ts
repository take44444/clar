import { ProjectModel } from "@/models/project.model";
import { Injectable } from "@nestjs/common";
import { GremlinService } from "./gremlin.service";

function normalizeData(gremlinData: Map<string, any>) {
  // Do this so that JSON.stringify works for maps
  (Map.prototype as any).toJSON = function () {
    return Object.fromEntries(this);
  };
  const mapStrippedData = JSON.parse(JSON.stringify(gremlinData));
  // Undo it so that we don't permanently pollute globals
  (Map.prototype as any).toJSON = undefined;

  return mapStrippedData;
}

@Injectable()
export class ProjectService {
  constructor(private gremlin: GremlinService) {}

  async project() {
    await this.gremlin.g.addV('project').property('name', 'clar').next();
    const project = normalizeData((await this.gremlin.g.V().hasLabel('project').next()).value);
    await this.gremlin.g.V().drop().next();
    const ret: ProjectModel = {
      id: project.id,
      name: project.properties.name[0].value,
      members: [
        {
          user: {
            id: 1,
            name: "Takeshi Masumoto"
          },
          roles: [
            {
              id: 2,
              name: "Administrator",
              project: {
                id: project.id,
                name: project.properties.name[0].value,
              }
            }
          ],
          tasks: [
            {
              id: 3,
              name: "create gremlin service",
              process: {
                id: 4,
                name: "first step",
              }
            }
          ]
        }
      ]
    };
    return ret;
  }
}
