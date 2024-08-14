import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from './schema';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const cookies = req.headers.get('cookie') || '';

    return {
      cookies,
      req,
    } as any;
  } 
});

export { handler as GET, handler as POST };
