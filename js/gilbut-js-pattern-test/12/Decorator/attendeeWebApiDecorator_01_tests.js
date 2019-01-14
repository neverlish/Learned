// getAll()이 실패할 경우를 테스트
describe('attendeeWebApiDecorator', function() {
  'use strict';

  var decoratedWebApi,
      baseWebApi,
      underlyingFailure = '본함수 실패';

  beforeEach(function() {
    baseWebApi = Conference.fakeAttendeeWebApi();
    decoratedWebApi = Conference.attendeeWebApiDecorator(baseWebApi);
  });

  describe('getAll()', function() {
    describe('원 getAll이 실패할 경우', function() {
      it('원버림 프라미스를 반환한다', function(done) {
        spyOn(baseWebApi, 'getAll').and.returnValue(
          new Promise(function(resolve, reject) {
            setTimeout(function() {
              reject(underlyingFailure);
            }, 1);
          })
        );

        decoratedWebApi.getAll().then(
          function onSuccess() {
            expect('Underlying getAll succeeded').toBe(false);
            done()
          },
          function onFailure(reason) {
            expect(reason).toBe(underlyingFailure);
            done();
          }
        );
      });
    });
  });
});
