import 'dart:math';

import 'package:matrix2d/matrix2d.dart';

double sigmoid(double x) => 1 / (1 + exp(-x));

void main(List<String> arguments) {
  Matrix2d m2d = Matrix2d();

  var x = [
    [1.0, 0.5],
  ];

  var w1 = [
    [.1, .3, .5],
    [.2, .4, .6]
  ];

  var b1 = [
    [0.1, .2, .3]
  ];

  var w2 = [
    [.1, .4],
    [.2, .5],
    [.3, .6]
  ];

  var b2 = [
    [0.1, .2]
  ];

  var w3 = [
    [.1, .3],
    [.2, .4]
  ];

  var b3 = [
    [.1, .2]
  ];

  var w1x = m2d.dot(x, w1);

  var z1 = m2d.addition(w1x, b1);

  var twoDList = List<List>.generate(
    z1.shape[0],
    (i) => List<double>.generate(
      z1.shape[1],
      (index) => 0,
      growable: false,
    ),
  );

  for (var i = 0; i < z1.shape[0]; i++) {
    for (var j = 0; j < z1.shape[1]; j++) {
      twoDList[i][j] = sigmoid(z1[i][j]);
    }
  }

  print(twoDList);

  z1 = twoDList;

  var z1w2 = m2d.dot(z1, w2);
  var h2 = m2d.addition(z1w2, b2);

  twoDList = List<List>.generate(
    h2.shape[0],
    (i) => List<double>.generate(
      h2.shape[1],
      (index) => 0,
      growable: false,
    ),
  );

  for (var i = 0; i < h2.shape[0]; i++) {
    for (var j = 0; j < h2.shape[1]; j++) {
      twoDList[i][j] = sigmoid(h2[i][j]);
    }
  }

  var z2 = twoDList;

  print(z2);

  var z2w3 = m2d.dot(z2, w3);
  var h3 = m2d.addition(z2w3, b3);

  twoDList = List<List>.generate(
    h3.shape[0],
    (i) => List<double>.generate(
      h3.shape[1],
      (index) => 0,
      growable: false,
    ),
  );

  for (var i = 0; i < h3.shape[0]; i++) {
    for (var j = 0; j < h3.shape[1]; j++) {
      twoDList[i][j] = sigmoid(h3[i][j]);
    }
  }

  var z3 = twoDList;

  print(z3);

  List softmax(List v) {
    var twoDList = List<List>.generate(
      v.shape[0],
      (i) => List<double>.generate(
        v.shape[1],
        (index) => 0,
        growable: false,
      ),
    );

    for (var i = 0; i < v.shape[0]; i++) {
      for (var j = 0; j < v.shape[1]; j++) {
        twoDList[i][j] = exp(v[i][j]);
      }
    }

    final sumExpValue = m2d.sum(twoDList);
    final divValue = m2d.fill(v.shape[0], v.shape[1], sumExpValue);
    final result = m2d.division(twoDList, divValue);
    return result;
  }

  final y = softmax(z3);

  print(y);
}
