import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as gremlin from 'gremlin';

@Injectable()
export class GremlinService implements OnModuleInit, OnModuleDestroy {
  dc: gremlin.driver.DriverRemoteConnection
  g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>
  constructor () {
    const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
    this.dc = new DriverRemoteConnection('ws://localhost:8182/gremlin', {});
  }

  async onModuleInit() {
    const Graph = gremlin.structure.Graph;
    const graph = new Graph();
    this.g = graph.traversal().withRemote(this.dc);
  }

  async onModuleDestroy() {
    this.dc.close();
  }
}