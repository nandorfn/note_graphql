import { Resolvers } from "@apollo/client";
import Note from "@models/note";
import { verifyCookie } from "@utils/auth";
import ApiResponseBuilder from "@utils/http";
import { v4 as uuidv4 } from 'uuid';

const noteInstance = new Note();

const noteResolvers: Resolvers = {
  Query: {
    notes: async (_, __, { cookies }) => {
      const user = await verifyCookie(cookies);

      if (!user) {
        return new ApiResponseBuilder()
          .setError('UNAUTHORIZED', 'Please, login to access this resource!')
          .build();
      }

      try {
        const notes = await noteInstance.getAllByUser(user.id);
        const formattedNotes = notes.map(note => ({
          ...note,
          createdAt: note?.createdAt?.toLocaleDateString("id-ID"),
          updatedAt: note?.updatedAt?.toLocaleDateString("id-ID"),
        }));
        return new ApiResponseBuilder()
          .setSuccess({ notes: formattedNotes || [] })
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
        const tempNote = {
          id: note?.id,
          title: note?.title,
          body: note?.body,
          createdAt: note?.createdAt?.toLocaleDateString("id-ID"),
          updatedAt: note?.updatedAt?.toLocaleDateString("id-ID"),
        }
        return new ApiResponseBuilder()
          .setSuccess({ note: tempNote })
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
          .setError('UNAUTHORIZED', 'Please, login to access this resource!')
          .build();
      }

      try {
        const note = await noteInstance.create({
          id: uuidv4(),
          user_id: user.id,
          ...input
        });

        if (!note) {
          throw new Error('Failed to create note');
        } else {
          const tempNote = {
            id: note?.id,
            title: note?.title,
            body: note?.body,
            createdAt: note?.createdAt?.toLocaleDateString("id-ID"),
            updatedAt: note?.updatedAt?.toLocaleDateString("id-ID"),
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
    },

    update: async (_, { id, input }, { cookies }) => {
      const user = await verifyCookie(cookies);

      if (!user) {
        return new ApiResponseBuilder()
          .setError('UNAUTHORIZED', 'Please, login to access this resource!')
          .build();
      }

      try {
        const existingNote = await noteInstance.getById(id);

        if (!existingNote) {
          return new ApiResponseBuilder()
            .setError('NOT_FOUND', 'Note not found')
            .build();
        }

        const updatedNote = await noteInstance.update(id, {
          ...input,
          "updatedAt": new Date()
        });

        const tempNote = {
          id: updatedNote?.id,
          title: updatedNote?.title,
          body: updatedNote?.body,
          createdAt: updatedNote?.createdAt?.toLocaleDateString("id-ID"),
          updatedAt: updatedNote?.updatedAt?.toLocaleDateString("id-ID"),
        };

        return new ApiResponseBuilder()
          .setSuccess({ note: tempNote })
          .build();
      } catch (error) {
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to update note')
          .build();
      }
    },

    delete: async (_, { id }, { cookies }) => {
      const user = await verifyCookie(cookies);

      if (!user) {
        return new ApiResponseBuilder()
          .setError('UNAUTHORIZED', 'Please, login to access this resource!')
          .build();
      }

      try {
        const existingNote = await noteInstance.getById(id);

        if (!existingNote) {
          return new ApiResponseBuilder()
            .setError('NOT_FOUND', 'Note not found')
            .build();
        }

        await noteInstance.deleteById(id);

        return new ApiResponseBuilder()
          .setSuccess({ message: 'Note successfully deleted' })
          .build();
      } catch (error) {
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to delete note')
          .build();
      }
    }
  }
};

export default noteResolvers;
