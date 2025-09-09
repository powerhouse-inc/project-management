import { Subgraph } from "@powerhousedao/reactor-api";
import type { DocumentNode } from "graphql";
import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class ScopeOfWorkSubgraph extends Subgraph {
  name = "scope-of-work";
  typeDefs: DocumentNode = schema;
  resolvers: Record<string, unknown> = getResolvers(this);
  additionalContextFields = {};
  async onSetup() { }
  async onDisconnect() { }
}
