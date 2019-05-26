var requestStream = Rx.Observable.of('https://api.github.com/users');

var responseStream = requestStream
  .flatMap(requestUrl => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));

function createSuggestionStream(responseStream) {
  return responseStream.map(listUser =>
    listUser[Math.floor(Math.random() * listUser.length)]
  );
}

var suggestion1Stream = createSuggestionStream(responseStream);
var suggestion2Stream = createSuggestionStream(responseStream);
var suggestion3Stream = createSuggestionStream(responseStream);

function renderSuggestion(userData, selector) {
  var element = document.querySelector(selector);
  var usernameEl = element.querySelector('.username');
  usernameEl.href = userData.html_url;
  usernameEl.textContent = userData.login;
  var imgEl = element.querySelector('img');
  imgEl.src = userData.avatar_url;
}

suggestion1Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});

suggestion2Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion2');
});

suggestion3Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion3');
});