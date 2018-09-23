var Conference = Conference || {};

Conference.checkInRecorder = function() {
  var messages = {
    mustBeCheckedIn: '참가자는 체크인된 것으로 표시되어야 한다.',
    httpFailure: 'HTTP 요청 실패!'
  };

  return {
    getMessages: function() {
      return messages;
    },

    recordCheckIn: function(attendee) {
      return new Promise(function(resolve, reject) {
        if (attendee.isCheckedIn()) {
          // *** 3 ***
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function onreadystatechange() {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                // *** 7 ***
                resolve(xhr.responseText);
              } else {
                reject(new Error(messages.httpFailure));
              }
            }
          };
          xhr.open('POST', '/checkin/' + attendee.getId(), true);
          xhr.send();
        } else {
          reject(new Error(messages.mustBeCheckedIn));
        }
      });
    }
  };
};
