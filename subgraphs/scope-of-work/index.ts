import { Subgraph } from "@powerhousedao/reactor-api";

import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class ScopeOfWorkSubgraph extends Subgraph {
  name = "scope-of-work";

  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
