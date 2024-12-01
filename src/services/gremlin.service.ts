import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as gremlin from 'gremlin';

@Injectable()
export class GremlinService implements OnModuleInit, OnModuleDestroy {
  dc: gremlin.driver.DriverRemoteConnection
  g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>
  constructor () {
    this.dc = new gremlin.driver.DriverRemoteConnection('ws://localhost:8182/gremlin', {});
  }

  async onModuleInit() {
    const graph = new gremlin.structure.Graph();
    this.g = graph.traversal().withRemote(this.dc);
  }

  async onModuleDestroy() {
    this.dc.close();
  }
}