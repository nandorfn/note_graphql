import { Resolvers } from "@apollo/client";
import Note from "@models/note";
import { verifyCookie } from "@utils/auth";
import ApiResponseBuilder from "@utils/http";
import { v4 as uuidv4 } from 'uuid';

const noteInstance = new Note();
const noteResolvers: Resolvers = {
  Query: {
    notes: async () => {
      try {
        const notes = await noteInstance.getAll();
        return new ApiResponseBuilder()
          .setSuccess({ notes: notes || [] })
          .build();
      } catch (error) {
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to fetch notes')
          .build();
      }
    },
    note: async (_, { id }) => {
      try {
        const note = await noteInstance.getById(id);
        return new ApiResponseBuilder()
          .setSuccess({ note: note })
          .build();
      } catch (error) {
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to fetch note')
          .build();
      }
    },
  },

  Mutation: {
    create: async (_, { input }, { cookies }) => {
      const user = await verifyCookie(cookies);

      if (!user) {
        return new ApiResponseBuilder()
          .setError('UNAUTHORIZED', 'Please, login to acces this resource!')
          .build();
      }

      try {
        const note = await noteInstance.create({
          id: uuidv4(),
          user_id: user.id,
          ...input
        });

        if (!note) {
          throw new Error('Failed to create note')
        } else {
          const tempNote = {
            id: note.id,
            title: note.title,
            body: note.body,
            createdAt: note.createdAt,
          }
          return new ApiResponseBuilder()
            .setSuccess({ note: tempNote })
            .build();
        }
      } catch (error) {
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to create note')
          .build();
      }
    }
  }
}

export default noteResolvers;