import { Resolvers } from "../../../types/resolvers";
import { UpdateMyProfileResponse, UpdateMyProfileMutationArgs } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async(
      _, 
      args: UpdateMyProfileMutationArgs, 
      { req }
    ): Promise<UpdateMyProfileResponse> => {
      const user: User = req.user;
      const notNull = {};
      Object.keys(args).forEach(key => {
        if (args[key] !== null) {
          notNull[key] = args[key];
        }
      });
      try {
        if (args.password !== null) {
          user.password = args.password;
          user.save();
        }
        await User.update({ id: user.id }, { ...notNull });
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
      
    })
  }
};

export default resolvers;
