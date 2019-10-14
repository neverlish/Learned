import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        return 'TOKEN';
      } else {
        throw new Error('Wrong email/secret combination');
      }
    },
  },
};
