import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user/user.resolvers';
import userTypeDefs from './user/user.typeDefs';

export const typeDefs = mergeTypeDefs([userTypeDefs]);
export const resolvers = mergeResolvers([userResolvers]);
