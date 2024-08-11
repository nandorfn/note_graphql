import { Resolvers } from "@apollo/client";
import User from "@models/user";
import { applyJWT, comparePassword, hashPass } from "@utils/auth";
import ApiResponseBuilder from "@utils/http";

const userResolvers: Resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.getById(id);
        if (!user) {
          return new ApiResponseBuilder()
            .setError('USER_NOT_FOUND', 'User not found')
            .build();
        }
        return new ApiResponseBuilder()
          .setSuccess(user)
          .build();
      } catch (error) {
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to fetch user')
          .build();
      }
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      const { username, email, password } = input;
      try {
        const existingUser = await User.getByEmail(email);
        console.log('existingUser', existingUser)
        if (existingUser) {
          return new ApiResponseBuilder()
            .setError('EMAIL_FIELD', 'Email already registered')
            .build();
        }

        const { hashedPassword } = await hashPass(password);
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        return new ApiResponseBuilder()
        .setSuccess({ user: newUser})
        .build();
      } catch (error) {
        console.log(error);
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to register user')
          .build();
      }
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      try {
        const user = await User.getByEmail(email);
        if (!user) {
          return new ApiResponseBuilder()
            .setError('USER_NOT_FOUND', 'User not found')
            .build();
        }

        const isValid = await comparePassword({
          passForm: password,
          passDB: user.password
        });

        if (!isValid) {
          return new ApiResponseBuilder()
            .setError('INVALID_CREDENTIALS', 'Invalid credentials')
            .build();
        }

        const tempUser = {
          id: user.id,
          email: user.email,
          username: user.username
        }
        await applyJWT(tempUser);
        return new ApiResponseBuilder()
          .setSuccess({ user: tempUser })
          .build();
      } catch (error) {
        return new ApiResponseBuilder()
          .setError('INTERNAL_SERVER_ERROR', 'Failed to login')
          .build();
      }
    },
  },
};

export default userResolvers;
