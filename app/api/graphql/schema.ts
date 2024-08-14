import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user/user.resolvers';
import userTypeDefs from './user/user.typeDefs';
import noteResolvers from './note/note.resolvers';
import noteTypeDefs from './note/note.typeDefs';

export const typeDefs = mergeTypeDefs([userTypeDefs, noteTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, noteResolvers]);
