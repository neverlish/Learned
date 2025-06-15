import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_mlkit_image_labeling/google_mlkit_image_labeling.dart';
import 'package:image_picker/image_picker.dart';
import 'package:part5_mlkit_image_labaling_start/label_detector_painter.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
        ),
        useMaterial3: true,
      ),
      home: const FaceDetectorApp(),
    );
  }
}

class FaceDetectorApp extends StatefulWidget {
  const FaceDetectorApp({super.key});

  @override
  State<FaceDetectorApp> createState() => _FaceDetectorAppState();
}

class _FaceDetectorAppState extends State<FaceDetectorApp> {
  File? _image;
  String? _path;
  ImagePicker imagePicker = ImagePicker();
  CustomPaint? _customPaint;
  String? _text;
  
  late ImageLabeler imageLabeler;

  @override
  void initState() {
    super.initState();
    _initializeLabeler();
  }

  @override
  void dispose() {
    imageLabeler.close();
    super.dispose();
  }

  Future<String> getLocalPath(String path) async {
    return "${(await getApplicationSupportDirectory()).path}/$path";
  }

  Future<String> getAssetPath(String asset) async {
    final path = await getLocalPath(asset);
    await Directory(dirname(path)).create(recursive: true);

    final file = File(path);

    if (!await file.exists()) {
      final byteData = await rootBundle.load(asset);
      await file.writeAsBytes(byteData.buffer.asUint8List(
        byteData.offsetInBytes,
        byteData.lengthInBytes,
      ));
    }

    return file.path;
  }

  void _initializeLabeler() async {
    // imageLabeler = ImageLabeler(
    //   options: ImageLabelerOptions(),
    // );
    const path = "assets/lite-model_imagenet_mobilenet_v3_smal.tflite";
    final modelPath = await getAssetPath(path);
    final options = LocalLabelerOptions(modelPath: modelPath);
    imageLabeler = ImageLabeler(options: options);
  }

  void _initializeDetector() async {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("이미지 라벨링"),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      // body: CameraView(
      //   customPaint: _customPaint,
      //   onImage: _processImage,
      // )
      body: ListView(
        shrinkWrap: true,
        children: [
          _image != null
              ? SizedBox(
                  height: 400,
                  width: 400,
                  child: Image.file(_image!),
                )
              : Center(
                  child: Container(
                    height: 200,
                    width: 200,
                    margin: EdgeInsets.all(32),
                    decoration: BoxDecoration(border: Border.all()),
                    child: Center(
                      child: Text('이미지를 불러와주세요'),
                    ),
                  ),
                ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: ElevatedButton(
              onPressed: () {
                _getImage(ImageSource.gallery);
              },
              child: Text('갤러리 이미지 가져오기'),
            ),
          ),
          if (_image != null) Text(_text ?? ""),
        ],
      ),
    );
  }

  Future _getImage(ImageSource source) async {
    setState(() {
      _image = null;
    });

    final pickedFile = await imagePicker.pickImage(source: source);
    if (pickedFile != null) {
      _processFile(pickedFile.path);
    }
  }

  Future _processFile(String path) async {
    setState(() {
      _image = File(path);
    });
    _path = path;
    final inputImage = InputImage.fromFilePath(path);
    _processImage(inputImage);
  }

  Future<void> _processImage(InputImage inputImage) async {
    setState(() {
      _text = '';
    });

    final labels = await imageLabeler.processImage(inputImage);

    if (inputImage.metadata?.size != null &&
        inputImage.metadata?.rotation != null) {
      final painter = LabelDetectorPainter(labels);
      _customPaint = CustomPaint(
        painter: painter,
      );
    } else {
      String text = 'Label: ${labels.length}\n\n';
      for (var label in labels) {
        text += 'Label: ${label.label} | Confidence: ${label.confidence}\n';
      }
      setState(() {
        _text = text;
      });
    }
  }
}
