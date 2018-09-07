import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Between } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: privateResolver(async(_, __, { req }): Promise<GetNearbyDriversResponse> => {
      const user: User = req.user;
      const { lastLat, lastLng } = user;
      const drivers = await User.find({
        isDriving:  true,
        lastLat: Between(lastLat - 0.05, lastLat + 0.05),
        lastLng: Between(lastLng - 0.05, lastLng + 0.05)
      });
    })
  }
};

export default resolvers;
