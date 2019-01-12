var Conference = Conference || {};
Conference.presentationFactory = function presentationFactory() {
  'use strict';
  return {
    // obj 인자의 프로퍼티에 따라 하나의 Presentation 또는 그 하위 Presentation 중 하나를 생성한다.
    create: function (obj) {
      var baseProperties = ['title', 'presenter'],
      vendorProperties = ['vendor', 'product'],
      allProperties = baseProperties.concat(vendorProperties),
      p,
      ix;
      
      // presentationFactory에서 파라미터를 체크
      for (p in obj) {
        if (allProperties.indexOf(p) < 0) {
          throw new Error(
            Conference.presentationFactory.messages.unexpectedProperty + p);
        }
      }
      // 나중에 Presentation에서 유래한 객체를 반환할 예정
      for (ix = 0; ix < vendorProperties.length; ++ix) {
        if (obj.hasOwnProperty(vendorProperties[ix])) {
          return new Conference.VendorPresentation(
            obj.title, obj.presenter, obj.vendor, obj.product);
        }
      }
      return new Conference.Presentation(obj.title, obj.presenter);
    }
  };
};

Conference.presentationFactory.messages = {
  unexpectedProperty: '이상한 프로퍼티를 지닌 생성 파라미터가 있습니다.'
};
