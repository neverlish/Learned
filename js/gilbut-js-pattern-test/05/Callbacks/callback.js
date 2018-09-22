// 콜백 화살

CallbackArrow = CallbackArrow || {};

CallbackArrow.rootFunction = function() {
  CallbackArrow.firstFunction(function(arg) {
    // 첫 번째 콜백 로직

    CallbackArrow.secondFunction(function(arg) {
      // 두 번째 콜백 로직

      CallbackArrow.thirdFunction(function(arg) {
        // 세 번째 콜백 로직

        CallbackArrow.fourthFunction(function(arg) {
          // 네 번째 콜백 로직
        });
      });
    });
  });
};

CallbackArrow.firstFunction = function(callback1) {
  callback1(arg);
};

CallbackArrow.secondFunction = function(callback2) {
  callback2(arg);
};

CallbackArrow.thirdFunction = function(callback3) {
  callback3(arg);
};

CallbackArrow.fourthFunction = function(callback4) {
  callback4(arg);
};

// 콜백 화살 눌러 펴기

CallbackArrow = CallbackArrow || {};

CallbackArrow.rootFunction = function() {
  CallbackArrow.firstFunction(CallbackArrow.firstCallback);
};

CallbackArrow.firstFunction = function(callback1) {
  callback1(arg);
};

CallbackArrow.secondFunction = function(callback2) {
  callback2(arg);
};

CallbackArrow.thirdFunction = function(callback3) {
  callback3(arg);
};

CallbackArrow.fourthFunction = function(callback4) {
  callback4(arg);
};

CallbackArrow.firstCallback = function() {
  // 첫 번째 콜백 로직
  CallbackArrow.secondFunction(CallbackArrow.secondCallback);
};

CallbackArrow.secondCallback = function() {
  // 두 번째 콜백 로직
  CallbackArrow.thirdFunction(CallbackArrow.thirdCallback);
};

CallbackArrow.thirdCallback = function() {
  // 세 번째 콜백 로직
  CallbackArrow.fourthFunction(CallbackArrow.fourthCallback);
};

CallbackArrow.fourthCallback = function() {
  // 네 번째 콜백 로직
};
