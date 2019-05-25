// 09 Define Interfaces and Share Class Members through Mixins in Dart

void main() {
  var pixel1 = Phone('Pixel XL', 'HTC');
  pixel1.getDeviceInfo();
  pixel1.getAllFeatures();
}

mixin FeaturesMixin {
  bool blueTooth = true;
  bool dualSim = false;
  bool nfc = true;
}

mixin UtilitiesMixin on FeaturesMixin {
  bool calculator = true;
  bool flashlight = true;
  bool thermometer = false;

  String _has(bool feat) => feat ? 'Yes' : 'No';

  void getAllFeatures() => print('''
  --FEATURES--

  Bluetooth: ${_has(super.blueTooth)}
  Dual SIM: ${_has(super.dualSim)}
  NFC: ${_has(super.nfc)}
  Calculator: ${_has(calculator)}
  Flashlight: ${_has(flashlight)}
  Thermometer: ${_has(thermometer)}
  ''');
}

abstract class Device {
  String name;
  String manufacturer;
  void getDeviceInfo();
}

class Phone with FeaturesMixin, UtilitiesMixin implements Device {
  Phone(this.name, this.manufacturer);

  String name;
  String manufacturer;

  void getDeviceInfo() => print('''
  ===
  Device name: $name
  Manufactured by: $manufacturer

  ''');
}
