// 11 Capture and Handle Data Sequences with Streams in Dart

import 'dart:io';
import 'dart:async';
import 'dart:convert';

void main() async {
  // Single subscription stream
  StreamController<String> controller = StreamController<String>();

  controller.stream.listen(
      (data) => print('Received data: ${data.toUpperCase()}'),
      onDone: () => print('No more data on stream.'),
      onError: (e) => print('Exception: $e'));

  // controller.stream.listen((data) => print('Received data again: $data')); // Bad state: Stream has already been listened to.

  controller.add('Hello');
  controller.add('World');

  controller.addError('This is an error.');

  await controller.close();
  print('$controller is fully closed.');

  // Broadcast stream
  StreamController<String> controller2 = StreamController<String>();
  Stream<String> controllerAsBroadcast = controller2.stream.asBroadcastStream();

  controllerAsBroadcast.listen((data) => print('Received data: $data'));
  controllerAsBroadcast.listen((data) => print('Received data again: $data'));

  controller2.add('Hello');
  controller2.add('Hello');

  // await for (var data in controllerAsBroadcast) {
  //   print('`Awaited` for data: $data');
  // }

  Future<String> result = HttpClient()
      .getUrl(Uri.parse('https://swapi.co/api/people/1'))
      .then((request) => request.close())
      .then((response) => response.transform(Utf8Decoder()).first);
  Stream<String> resultStream = Stream.fromFuture(result);

  resultStream.listen((data) => print('=> Got data: $data'),
      onError: (e) => print(e.type),
      onDone: () => print('No more data on stream.'));

  Future<String> result2 = HttpClient()
      .getUrl(Uri.parse('https://swapi.co/api/people/2'))
      .then((request) => request.close())
      .then((response) => response.transform(Utf8Decoder()).first);

  Stream<String> peopleStream = Stream.fromFutures([result, result2]);

  peopleStream.listen((person) => print('=> Got person: $person'),
      onDone: () => print('No more people on stream.'));

  List<String> chars = 'Dart is awesome'.split('');
  Stream<String> charStream = Stream.fromIterable(chars);

  var idx = 0;
  charStream.listen((char) {
    Timer(Duration(milliseconds: idx * 200), () => print(char));
    idx++;
  });
}

/*
Received data: HELLO
Received data: WORLD
Exception: This is an error.
No more data on stream.
Instance of '_AsyncStreamController<String>' is fully closed.
Received data: Hello
Received data again: Hello
Received data: Hello
Received data again: Hello
D
a
r
t

i
s

a
w
=> Got data: {"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://swapi.co/api/planets/1/","films":["https://swapi.co/api/films/2/","https://swapi.co/api/films/6/","https://swapi.co/api/films/3/","https://swapi.co/api/films/1/","https://swapi.co/api/films/7/"],"species":["https://swapi.co/api/species/1/"],"vehicles":["https://swapi.co/api/vehicles/14/","https://swapi.co/api/vehicles/30/"],"starships":["https://swapi.co/api/starships/12/","https://swapi.co/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://swapi.co/api/people/1/"}
No more data on stream.
=> Got person: {"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://swapi.co/api/planets/1/","films":["https://swapi.co/api/films/2/","https://swapi.co/api/films/6/","https://swapi.co/api/films/3/","https://swapi.co/api/films/1/","https://swapi.co/api/films/7/"],"species":["https://swapi.co/api/species/1/"],"vehicles":["https://swapi.co/api/vehicles/14/","https://swapi.co/api/vehicles/30/"],"starships":["https://swapi.co/api/starships/12/","https://swapi.co/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://swapi.co/api/people/1/"}
=> Got person: {"name":"C-3PO","height":"167","mass":"75","hair_color":"n/a","skin_color":"gold","eye_color":"yellow","birth_year":"112BBY","gender":"n/a","homeworld":"https://swapi.co/api/planets/1/","films":["https://swapi.co/api/films/2/","https://swapi.co/api/films/5/","https://swapi.co/api/films/4/","https://swapi.co/api/films/6/","https://swapi.co/api/films/3/","https://swapi.co/api/films/1/"],"species":["https://swapi.co/api/species/2/"],"vehicles":[],"starships":[],"created":"2014-12-10T15:10:51.357000Z","edited":"2014-12-20T21:17:50.309000Z","url":"https://swapi.co/api/people/2/"}
No more people on stream.
e
s
o
m
e
*/
