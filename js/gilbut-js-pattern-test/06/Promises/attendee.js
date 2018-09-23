var Conference = Conference || {};
Conference.attendee = function(firstName, lastName) {
  var checkedIn = false,
      first = firstName || 'None',
      last = lastName || 'None';

  return {
    getFullName: function() {
      return first + ' ' + last;
    },

    isCheckedIn: function() {
      return checkedIn;
    },

    checkIn: function() {
      checkedIn = true;
    },

    undoCheckIn: function() {
      checkedIn = false;
      checkInNumber = undefined;
    },

    setCheckInNumber: function(number) {
      checkInNumber = number;
    },

    getCheckInNumber: function() {
      return checkInNumber;
    }
  };
};
