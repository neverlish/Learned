// getRestaurantsWithinRadius를 returnValueCache 애스팩트로 장식

// getRestaurantsWithinRadius에 메모이제이션 패턴 적용

Aop.around(
  // 반환값을 수정해야 할 함수
  'restaurantApi',

  // 반환값을 수정하는 함수
  function addMemoziationToGetRestaurantsWithinRadius(targetInfo) {
    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api = Aop.next.call(this, targetInfo);

    // getRestaurantsWithinRadius 함수를 장식하여 메모이제이션 추가
    Aop.around('getRestaurantsWithinRadius에', Aspects.returnValueCache().advice, api);

    // 고친 API를 반환한다
    return api;
  },

  // 반환값을 수정해야 할 함수의 이름공간
  ThirdParty
);

// ThirdParty.restaurantApi()에 getRestaurantsNearConference 멤버 추가

Aop.around(
  // 반환값을 수정해야 할 함수
  'restaurantApi',

  // 반환값을 수정하는 함수
  function addGetRestaurantsNearConference(targetInfo) {
    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api = Aop.next.call(this, targetInfo);

    // API에 추가할 함수
    function getRestaurantsNearConference(cuisine) {
      return api.getRestaurantsWithinRadius('울산 남구 신정로 20번길 988', 2.0, cuisine);
    }

    // 없으면 이 함수를 추가한다
    api.getRestaurantsNearConference = api.getRestaurantsNearConference || getRestaurantsNearConference;

    // 고친 API를 반환한다
    return api;
  },

  // 반환값을 수정해야 할 함수의 이름공간
  ThirdParty
);
