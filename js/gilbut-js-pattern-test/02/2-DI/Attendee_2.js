// 빈자의 의존성 주입 방식으로 작성한 Attendee 객체

Attendee = function(service, messenger, attendeeId) {
  // 'new'로 생성하도록 강제한다.
  if (!(this instanceof Attendee)) {
    return new Attendee(attendeeId);
  }

  this.attendeeId = attendeeId;

  this.service = service;
  this.messenger = messenger;
}
