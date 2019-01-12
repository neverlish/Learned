describe('presentationFactory', function() {
  'use strict';
  var factory = Conference.presentationFactory(),
      baseParameter = {
        title: '자바스크립트를 멋지게 사용해보세요',
        presenter: '박길벗'
      };
  
  describe('create(objectLiteral)', function() {
    // presentationFactory의 네거티브 테스트
    it('파라미터에 이상한 프로퍼티가 있으면 예외를 던진다', function() {
      var badProp = 'badProperty';
      function createWithUnexpectedProperties() {
        var badParam = {};
        badParam[badProp] = 'unexpected!';
        factory.create(badParam);
      }
      expect(createWithUnexpectedProperties).toThrowError(
        Conference.presentationFactory.messages.unexpectedProperty + badProp);
    });

    // 팩토리를 써서 Presentation을 생성하는 단위 테스트
    describe('기본 프로퍼티만 있을 경우', function() {
      var fakePresentation = { title: '프리젠테이션을 베끼는 방법' },
          spyOnConstructor,
          returnedPresentation;

      beforeEach(function() {
        spyOnConstructor = spyOn(Conference,'Presentation')
          .and.returnValue(fakePresentation);
        returnedPresentation = factory.create(baseParameter);
      });

      it("모든 값을 Presentation 생성자에 넘긴다", function() {
        expect(spyOnConstructor).toHaveBeenCalledWith(
          baseParameter.title, baseParameter.presenter);
      });

      it("Presentation 생성자를 딱 한번만 호출한다", function() {
        expect(spyOnConstructor.calls.count()).toBe(1);
      });

      it('생성한 Presentation을 반환한다', function() {
        expect(factory.create(baseParameter)).toBe(fakePresentation);
      });
    });

    // 팩토리를 써서 VendorPresentation을 생성하는 단위 테스트
    describe('VendorPresentation 프로퍼티가 적어도 하나 이상 있을 경우', function() {
      var vendorParamter = {
          title: '자바스크립트를 멋지게 사용해보세요',
          presenter: '박길벗',
          vendor: '길벗출판사',
          product: '자바스크립트의 바른 길'
        },
        fakeVendorPresentation = { title: vendorParamter.title },
        spyOnConstructor;

      beforeEach(function() {
        spyOnConstructor = spyOn(Conference, 'VendorPresentation')
          .and.returnValue(fakeVendorPresentation);
      });

      it('VendorPresentation을 생성해본다', function() {
        var expectedCallcount = 0;
        function createParam(propName) {
          var param = {},
              p;

          for (p in baseParameter) {
            param[p] = baseParameter[p];
          }
          param[propName] = vendorParamter[propName];
          return param;
        }
        // 각 vendor 프로퍼티를 차례로 지닌 파라미터를 생성한다.
        ['vendor', 'product'].forEach(function(propName) {
          var param = createParam(propName);
          var presentation = factory.create(param);
          expect(spyOnConstructor.calls.count()).toBe(++expectedCallcount);
        });
      });

      it('모든 값을 VendorPresentation 생성자에 넘긴다', function() {
        factory.create(vendorParamter);
        expect(spyOnConstructor).toHaveBeenCalledWith(
          vendorParamter.title, vendorParamter.presenter, vendorParamter.vendor, vendorParamter.product);
      });

      it('VendorPresentation 생성자를 딱 한 번만 호출한다', function() {
        factory.create(vendorParamter);
        expect(spyOnConstructor.calls.count()).toBe(1);
      });

      it('생성한 VendorPresentation을 반환한다', function() {
        expect(factory.create(vendorParamter)).toBe(fakeVendorPresentation);
      });
    });
  });
});
