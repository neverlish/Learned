// memoizedRestaurantApi 구현부

var Conference = Conference || {};

Conference.memoizedRestaurantApi = function (thirdPaytyApi) {
  var api = thirdPaytyApi,
      cache = {};

  return {
    getRestaurantsNearConference: function(cuisine) {
      if (cache.hasOwnProperty(cuisine)) {
        return cache[cuisine];
      }

      var returnedPromise = api.getRestaurantsNearConference(cuisine);
      cache[cuisine] = returnedPromise;
      return returnedPromise;
    }
  };
};
