import { Resolvers } from '../../../types/resolvers';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from '../../../types/graph';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: 'You should log in instead',
            token: null
          };
        } else {
          await User.create({ ...args }).save();
          return {
            ok: true,
            error: null,
            token: 'Coming soon!'
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
