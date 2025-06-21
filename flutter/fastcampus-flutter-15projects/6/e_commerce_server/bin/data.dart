part of 'server.dart';

// 배너 이미지
List<String> bannerImageList = [
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1513116476489-7635e79feb27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=793&q=80',
  'https://images.unsplash.com/photo-1520931061294-db3e762a9273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1517088587697-8de5e72b421b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
];

// 상품 데이터
List<ProductInfoDto> marketProductList = [
  ProductInfoDto(
    title: '동물복지 백색 유정란 20구',
    subtitle: '1구 당 판매가 최저!',
    imageUrl:
        'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '백미밥 210g*24입',
    subtitle: '넉넉히 두고 맛보는 국산 쌀밥',
    imageUrl:
        'https://images.unsplash.com/photo-1592997571659-0b21ff64313b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '[한판] 치즈 부대찌개 1858g(냉장)',
    subtitle: '콩나물, 치즈와 2인용으로 돌아온',
    imageUrl:
        'https://images.unsplash.com/photo-1508709315803-6342a28d32a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=885&q=80',
  ),
  ProductInfoDto(
    title: '칼로리가 가벼운 아이스크림 11종',
    subtitle: '마음 놓고 즐기는 달콤함',
    imageUrl:
        'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  ),
  ProductInfoDto(
    title: '제주 손질 갈치 반마리(왕특대) 220g (생물)',
    subtitle: '두툼한 몸통 부분만 엄선했습니다!',
    imageUrl:
        'https://images.unsplash.com/photo-1577193268287-e75ee81fefd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '한돈 특수부위 반반팩 500g (가브리, 갈매기, 항정)',
    subtitle: '100 당 판매가 최저 상품',
    imageUrl:
        'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '[제스프리] 뉴질랜드 직수입, 당도 최고 골드키위 1.1kg (7~10입)',
    subtitle: '뉴질랜드에서 온 촉촉한 달콤함',
    imageUrl:
        'https://images.unsplash.com/photo-1616684000067-36952fde56ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
  ),
  ProductInfoDto(
    title: '[비프쉐프] 호주산 목초육 안심 스테이크 250g (냉장)',
    subtitle: '신선한 호주산 육우를 집에서!',
    imageUrl:
        'https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '미백치약 아쿠아 민트향 100g',
    subtitle: '환한 미소를 위한 미백 치약',
    imageUrl:
        'https://images.unsplash.com/photo-1588774583125-bac783343696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '2023 네이처썸머 밴드형/팬티형 기저귀 10종 세트',
    subtitle: '뚝 떨어진 귀저귀! 최저가로 구매하세요!',
    imageUrl:
        'https://images.unsplash.com/photo-1635874714425-c342060a4c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  ),
];

List<ProductInfoDto> beautyProductList = [
  ProductInfoDto(
    title: '블랙 쿠션(리필포함) 6종 택 1',
    subtitle: '내 피부 같은 초밀착 커버',
    imageUrl:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=887&q=80',
  ),
  ProductInfoDto(
    title: '[특가] 선인장 바디워시 1L (대용량, 비건)',
    subtitle: '넉넉하게 사용하는 고보습 바디 워시',
    imageUrl:
        'https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
  ),
  ProductInfoDto(
    title: '[에스티 로더] 갈색병 세럼 75ml (+마이크로 에센스 100ml + 갈색병 15ml 증정)',
    subtitle: '한 병으로 되찾는 피부 균형',
    imageUrl:
        'https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  ),
  ProductInfoDto(
    title: '[페스타특가][페리오] 히말라야 핑크솔트 치약 3개입+1개입 2종 (택1)',
    subtitle: '상쾌함과 개운함이 오래가는 치약',
    imageUrl:
        'https://images.unsplash.com/photo-1614267861476-0d129972a0f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '[랑콤] 뗑 이돌 파운데이션 세트 11종 (택1) (마이뷰티박스 가입일 구매 시 +3% 적립)',
    subtitle: '가볍고 편안하게, 화사하게 피부표현',
    imageUrl:
        'https://images.unsplash.com/photo-1620917669809-1af0497965de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  ),
  ProductInfoDto(
    title: '[피토메르] 특별 기획세트Ⅱ (세럼 2종(본품) + 토너(본품) 구성)',
    subtitle: '탄탄하게 빛나는 수분 광채 피부',
    imageUrl:
        'https://plus.unsplash.com/premium_photo-1674739375681-605fb3afb6ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
  ),
  ProductInfoDto(
    title:
        '[케라스타즈] 엘릭서 얼팀 오리지널 100ml + 엘릭서 얼팀 오리지널 15ml(마이뷰티박스 가입일 구매 시 +3%적립)',
    subtitle: '얼팀 오리지널을 이 가격에?!',
    imageUrl:
        'https://plus.unsplash.com/premium_photo-1679064287823-fbd549bf47dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  ),
  ProductInfoDto(
    title: '[산타마리아노벨라] 아쿠아 디 로즈 2종 (택1) (장미수 토너)',
    subtitle: '사계절 멀티토너',
    imageUrl:
        'https://plus.unsplash.com/premium_photo-1673822402526-04413688da96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
  ),
  ProductInfoDto(
    title: '[에끌라두] 골든 샌달 우드 괄사 (페이스&두피 마시지 툴)',
    subtitle: '시원하고 섬세하게 마사지',
    imageUrl:
        'https://images.unsplash.com/photo-1614859475299-814a09cd2e79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ),
  ProductInfoDto(
    title: '[KS365] 데일리 항균처리 쿠션 퍼프 2종(택1)',
    subtitle: '향균처리가 되어 있는 각성비 물방울 모양 퍼프',
    imageUrl:
        'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  ),
];

// viewModules
List<ViewModuleDto> viewModules(String mallType) {
  return [
    ViewModuleDto(
      type: 'carousel_view_module',
      products: [
        ProductInfoDto(imageUrl: bannerImageList[0]),
        ProductInfoDto(imageUrl: bannerImageList[1]),
        ProductInfoDto(imageUrl: bannerImageList[2]),
        ProductInfoDto(imageUrl: bannerImageList[3]),
        ProductInfoDto(imageUrl: bannerImageList[4]),
      ],
    ),
    ViewModuleDto(
      type: 'scroll_view_module',
      title: '이 상품 어때요?',
      products: productGenerator(10, mallType),
    ),
    ViewModuleDto(
      type: 'special_price_view_module',
      title: '24시간 특가',
      subtitle: '24시간 동안만 만날 수 있는 특별한 가격!',
      products: productGenerator(4, mallType),
      time: DateTime.now().add(Duration(hours: 1)).millisecondsSinceEpoch,
    ),
    ViewModuleDto(
      type: 'scroll_view_module',
      title: '놓치면 후회할 가격',
      products: productGenerator(10, mallType),
    ),
    ViewModuleDto(
      type: 'scroll_view_module',
      title: '최고 인기 상품 모음',
      subtitle: '최근 2주간 판매량이 가장 많았어요',
      products: productGenerator(10, mallType),
    ),
    ViewModuleDto(
      type: 'banner_view_module',
      imageUrl: bannerImageList[Random().nextInt(5)],
    ),
    ViewModuleDto(
      type: 'category_product_view_module',
      title: 'MD의 추천',
      products: productGenerator(6, mallType),
      tabs: ['가전, 가구 특가', '프리미엄 주방 특가', '뷰티 특가', '프리미엄 식품 특가'],
    ),
    ViewModuleDto(
      type: 'banner_view_module',
      imageUrl: bannerImageList[Random().nextInt(5)],
    ),
    ViewModuleDto(
      type: 'brand_product_view_module',
      title: '알뜰 상품 모음전',
      subtitle:
          r'비싸고 좋은 상품을 찾기는 쉽습니다. '
          r'하지만 값싸고 좋은 상품을 찾기란 하늘의 별따기 만큼 어렵죠. '
          r'여기까지 찾아온 여러분의 노력이 헛되이지 않게 가성비, '
          r'가심비를 모두 잡을 수 있는 상품을 준비했습니다.',
      products: productGenerator(3, mallType),
    ),
    ViewModuleDto(
      type: 'banner_view_module',
      imageUrl: bannerImageList[Random().nextInt(5)],
    ),
    ViewModuleDto(
      type: 'scroll_view_module',
      title: '지금 가장 핫한 상품',
      products: productGenerator(7, mallType),
    ),
    ViewModuleDto(
      type: 'scroll_view_module',
      title: '가성비 최고의 상품들',
      subtitle: '100g 당 가격으로 환산해보면 진짜 저렴해요!',
      products: productGenerator(5, mallType),
    ),
  ];
}

// menu data
List<Map<String, Object>> marketStore = [
  {"tabId": 10001, "title": "F-추천"},
  {"tabId": 10002, "title": "신상품"},
  {"tabId": 10003, "title": "베스트"},
  {"tabId": 10004, "title": "알뜰쇼핑"},
  {"tabId": 10005, "title": "특가/혜택"},
];

List<Map<String, Object>> beautyStore = [
  {"tabId": 20001, "title": "F-추천"},
  {"tabId": 20002, "title": "LUXURY"},
  {"tabId": 20003, "title": "신상품"},
  {"tabId": 20004, "title": "베스트"},
  {"tabId": 20005, "title": "특가/혜택"},
  {"tabId": 20005, "title": "브랜드"},
];

// utils
List<ProductInfoDto> productGenerator(int length, String storeType) {
  var randomSet = getRandomSet(length, 10);
  var productList = storeType == 'market'
      ? marketProductList
      : beautyProductList;

  List<ProductInfoDto> list = List.generate(length, (index) {
    int originalPrice = (Random().nextInt(31) + 1) * 1000;
    int discountRate = Random().nextInt(50) + 1;

    return productList[randomSet.elementAt(index)].copyWith(
      productId:
          '$originalPrice'.padLeft(6, '0') + '$discountRate'.padLeft(6, '0'),
      price: originalPrice * (100 - discountRate) ~/ 100,
      discountRate: discountRate,
      originalPrice: originalPrice,
      reviewCount: Random().nextInt(10000) + 500,
    );
  });

  return list;
}

Set<int> getRandomSet(int length, int max) {
  Set<int> random = {};

  while (random.length != length) {
    random.add(Random(DateTime.now().microsecondsSinceEpoch).nextInt(max));
  }

  return random;
}
