// HTTP 없는 checkInRecorder.recordCheckIn의 단위 테스트

describe('Conference.checkInRecorder', function () {
  var attendee, checkInRecorder;

  beforeEach(function() {
    attendee = Conference.attendee('Tom', 'Jones');
    checkInRecorder = Conference.checkInRecorder();
  });
  
  describe('recordCheckIn(attendee)', function() {
    it('참가자가 체크인되면 checkInNumber로 귀결된 프라미스를 반환한다', function(done) {
      attendee.checkIn();
      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved(actualCheckInNumber) {
          expect(typeof actualCheckInNumber).toBe('number');
          done();
        },
        function promiseRejected() {
          expect('프라미스는 버려졌다').toBe(false);
          done();
        }
      );
    });

    it('참가자가 체크인되지 않으면 에러와 버림 프라미스를 반환한다', function(done) {
      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved(actualCheckInNumber) {
          expect('프라미스는 귀결됐다').toBe(false);
          done();
        },
        function promiseRejected(reason) {
          expect(reason instanceof Error).toBe(true);
          expect(reason.message).toBe(checkInRecorder.getMessages().mustBeCheckedIn);
          done();
        }
      );
    })
  });
});
