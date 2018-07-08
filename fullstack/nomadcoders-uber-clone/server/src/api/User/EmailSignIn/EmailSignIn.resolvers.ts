import User from "../../../entities/User";
import { 
  EmailSignInMutationArgs, 
  EmailSignInResponse 
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _, 
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      try {
        const { email } = args;
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "No User with that email",
            token: null
          }
        }
      } catch(error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
}

export default resolvers;
