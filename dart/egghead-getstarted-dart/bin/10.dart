// 10 Capture and Return Asynchronous Values with Futures in Dart

import 'dart:io';
import 'dart:async';
import 'dart:convert';

void main() {
  var result = Future(() => 'Hello, World!');
  result.then((str) => print(str));

  var delayedResult =
      Future.delayed(Duration(seconds: 2), () => 'Displayed after 2 seconds');
  delayedResult.then((str) => print(str));

  var showError = false;
  Future(() => showError ? throw 'There was an error' : '{"data": "Success"}')
      .then((str) => json.decode(str))
      .then((dataMap) => print(dataMap['data']))
      .catchError((err) => print(err));

  HttpClient()
      .getUrl(Uri.parse('https://swapi.co/api/people/1'))
      .then((request) => request.close())
      .then((response) => response.transform(Utf8Decoder()).listen(print))
      .catchError((err) => print('There was a problem: $err'));

  lookupVersion(cb) => Timer(Duration(seconds: 2), () => cb('v2.1.0'));
  lookupVersion((version) => print('Got the version: $version'));

  Future lookupVersionAsFuture() {
    var completer = Completer();
    // lookupVersion((version) => completer.complete(version));
    lookupVersion((_) => completer.completeError('There was a problem!'));
    return completer.future;
  }

  lookupVersionAsFuture()
      .then((version) => print('Got the `Future` version: $version'))
      .catchError(print);

  Future lookupVersionWithAsyncAwait() async {
    try {
      var version = await lookupVersionAsFuture();
      print('Got the `async/await` version: $version');
    } catch (e) {
      print('Caught Exception: $e');
    }
  }

  lookupVersionWithAsyncAwait();

  /**
  Hello, World!
  Success
  Displayed after 2 seconds
  Got the version: v2.1.0
  There was a problem!
  Caught Exception: There was a problem!
  {"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://swapi.co/api/planets/1/","films":["https://swapi.co/api/films/2/","https://swapi.co/api/films/6/","https://swapi.co/api/films/3/","https://swapi.co/api/films/1/","https://swapi.co/api/films/7/"],"species":["https://swapi.co/api/species/1/"],"vehicles":["https://swapi.co/api/vehicles/14/","https://swapi.co/api/vehicles/30/"],"starships":["https://swapi.co/api/starships/12/","https://swapi.co/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://swapi.co/api/people/1/"}
   */
}
