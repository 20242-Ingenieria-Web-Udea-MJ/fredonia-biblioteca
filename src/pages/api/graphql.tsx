import 'reflect-metadata';
import 'ts-tiny-invariant';
import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import Cors from 'micro-cors';
import { IncomingMessage, ServerResponse } from 'http';
import { customResolvers } from '../../../graphql/custom/resolver';
import { prisma } from '@/lib/PrismaConfig';
import { types } from '../../../graphql/custom/resolver';
import { customTypes } from '../../../graphql/custom/types';

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
});

interface Context {
  prisma: PrismaClient;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const functionHandler = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const apolloServer = new ApolloServer({
    context: (): Context => ({ prisma }),
    typeDefs: [...types, ...customTypes],
    resolvers: [...resolvers, ...customResolvers],
    persistedQueries: false, // This disables persisted queries
    cache: 'bounded', // This sets up a bounded cache
    introspection: process.env.NODE_ENV !== 'production',
  });
  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  return functionHandler(req, res);
});