// getRestaurantsNearConference

// ThirdParty.restaurantApi()에 getRestaurantnsNearConference 멤버를 추가한다.

Aop.around(
  // 반환값을 수정해야 할 함수
  'restaurantApi',

  // 반환값을 수정하는 함수
  function addGetRestaurantnsNearConference(targetInfo) {
    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api = Aop.next.call(this, targetInfo);

    // API에 추가할 함수
    function getRestaurantsNearConference(cuisine) {
      return api.getRestaurantsWithinRadius('울산 남구 신정로 20번길 988', 2.0, cuisine);
    }

    // 없으면 이 함수를 추가한다
    api.getRestaurantsNearConference = api.getRestaurantsNearConference || getRestaurantsNearConference;

    // 수정한 API를 반환한다
    return api;
  },

  // 반환값을 수정해야 할 함수의 이름공간
  ThirdParty
);
