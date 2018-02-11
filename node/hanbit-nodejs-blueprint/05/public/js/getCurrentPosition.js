function getCurrentPosition() {
  // 브라우저/내비게이터 지원 확인
  if (navigator.geolocation) {
    var options = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
    };
    navigator.geolocation.watchPosition(getUserPosition, trackError, options);
  } else {
    alert('Ops; Geolocation is not supported');
  }
  // 사용자 위치를 가져와 지도에 아이콘으로 표시
  function getUserPosition(position) {
    // 위도와 경도 확인
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    // 사용자 좌표 생성
    var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 12,
      center: googlePos,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // HTML Div를 얻기 위한 변수 설정
    var mapObj = document.getElementById('map');
    // 지도와 passing 생성: map div와 map 옵션
    // Create the map and passing: map div and map options
    var googleMap = new google.maps.Map(mapObj, mapOptions);
    // 사용자 위치로 지도에 마커 설정
    var markerOption = {
      map: googleMap,
      position: googlePos,
      animation: google.maps.Animation.DROP
    };
    // 지도의 마커 인스턴스 생성
    var googleMarker = new google.maps.Marker(markerOption);
    // Geocoder로 사용자의 완전한 주소 정보 가져오기
    // Google API
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'latLng': googlePos
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var popOpts = {
            content: results[1].formatted_address,
            position: googlePos
          };
          // 사용자의 정보가 담긴 정보 창 설정
          var popup = new google.maps.InfoWindow(popOpts);
          google.maps.event.addEventListener(googleMarker, 'click', function() {
            popup.open(googleMap);
          });
        } else {
          alert('No results found');
        }
      } else {
        alert('Uhh, failed: ' + status);
      }
    });
  }

  // 에러 함수 설정
  function trackError(error) {
    var err = document.getElementById('map');
    switch(error.code) {
      case error.PERMISSION_DENIED:
        err.innerHTML = 'Usr denied Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        err.innerHTML = 'Information is unavailable';
        break;
      case error.TIMEOUT:
        err.innerHTML = 'Location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        err.innerHTML = 'An unknown error.';
        break;
    }
  }
}
getCurrentPosition();
