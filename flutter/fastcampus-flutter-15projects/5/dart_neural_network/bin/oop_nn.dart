import 'dart:math';

import 'package:matrix2d/matrix2d.dart';

import 'dart_neural_network.dart';

Matrix2d m2d = Matrix2d();

List genList(List shape) {
  var twoDList = List<List>.generate(
    shape.shape[0],
    (i) => List<double>.generate(
      shape.shape[1],
      (index) => 0,
      growable: false,
    ),
  );

  return twoDList;
}

List sigmoidArray(List array) {
  var twoDList = genList(array);

  for (var i = 0; i < array.shape[0]; i++) {
    for (var j = 0; j < array.shape[1]; j++) {
      twoDList[i][j] = sigmoid(array[i][j]);
    }
  }

  return twoDList;
}

List softmaxArray(List array) {
  var twoDList = genList(array);

  for (var i = 0; i < array.shape[0]; i++) {
    for (var j = 0; j < array.shape[1]; j++) {
      twoDList[i][j] = exp(array[i][j]);
    }
  }

  final sumExpValue = m2d.sum(twoDList);
  final divValue = m2d.fill(array.shape[0], array.shape[1], sumExpValue);
  final result = m2d.division(twoDList, divValue);
  return result;
}

class Neuron {
  var w;
  var b;

  Neuron(this.w, this.b);

  List calculate(List input) {
    var wx = m2d.dot(input, w);
    var z = m2d.addition(wx, b);
    z = sigmoidArray(z);
    return z;
  }
}

class Layer {
  List<Neuron> neurons;

  Layer(this.neurons);

  List synapse(List input) {
    if (neurons.isEmpty) return [];

    var result = input;

    for (var i = 0; i < neurons.length; i++) {
      result = neurons[i].calculate(result);
    }

    return result;
  }
}

class Network {
  List<Layer> layers;

  Network(this.layers);

  List forward(List input) {
    List result = input;

    for (final layer in layers) {
      result = layer.synapse(result);
    }

    return result;
  }

  List inference(List v) {
    return softmaxArray(v);
  }
}

void main() {
  List<Neuron> neurons = [
    Neuron(
      [
        [.1, .3, .5],
        [.2, .4, .6]
      ],
      [
        [0.1, .2, .3]
      ],
    ),
    Neuron(
      [
        [.1, .4],
        [.2, .5],
        [.3, .6]
      ],
      [
        [0.1, .2]
      ],
    ),
    Neuron(
      [
        [.1, .3],
        [.2, .4]
      ],
      [
        [.1, .2]
      ],
    ),
  ];

  Layer layer = Layer(neurons);

  var layers = [layer];

  Network network = Network(layers);

  var z = network.forward([
    [1.0, 0.5]
  ]);

  var y = network.inference(z);

  print(y);
}
