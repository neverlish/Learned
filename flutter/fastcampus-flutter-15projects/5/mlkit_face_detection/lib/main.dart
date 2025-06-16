import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_face_detection/google_mlkit_face_detection.dart';
import 'package:image_picker/image_picker.dart';
import 'package:part5_mlkit_face_detection_start/camera_view_page.dart';
import 'package:part5_mlkit_face_detection_start/face_detector_painter.dart';

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
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
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
  File? image;
  ImagePicker imagePicker = ImagePicker();
  String? resultText;
  CustomPaint? customPaint;

  final FaceDetector _faceDetector = FaceDetector(
      options: FaceDetectorOptions(
    enableLandmarks: true,
    enableTracking: true,
    enableClassification: true,
    enableContours: true,
  ));

  @override
  void dispose() {
    _faceDetector.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("얼굴 인식 앱"),
        actions: [
          IconButton(
            onPressed: () {
              setState(() {
                image = null;
              });
            },
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      body: CameraView(
        onImage: _processImage,
        customPaint: customPaint,
      ),
      // body: Column(
      //   children: [
      //     image != null
      //         ? SizedBox(
      //             height: 400,
      //             width: 400,
      //             child: Image.file(image!),
      //           )
      //         : Center(
      //             child: Container(
      //               height: 200,
      //               width: 200,
      //               margin: EdgeInsets.all(32),
      //               decoration: BoxDecoration(
      //                 border: Border.all(),
      //               ),
      //               child: Center(
      //                 child: Text('얼굴 사진을 불러와주세요.'),
      //               ),
      //             ),
      //           ),
      //     ElevatedButton(
      //       onPressed: () => _getImage(ImageSource.gallery),
      //       child: Text('갤러리 이미지 가져오기'),
      //     ),
      //     Expanded(
      //       child: SingleChildScrollView(
      //         child: Text(resultText ?? ""),
      //       ),
      //     ),
      //   ],
      // ),
    );
  }

  Future _getImage(ImageSource source) async {
    setState(() {
      image = null;
    });

    final pickedFile = await imagePicker.pickImage(source: source);
    if (pickedFile != null) {
      _processFile(pickedFile.path);
    }
  }

  Future _processFile(String path) async {
    setState(() {
      image = File(path);
    });

    final inputImage = InputImage.fromFilePath(path);
    _processImage(inputImage);
  }

  Future<void> _processImage(InputImage inputImage) async {
    setState(() {
      resultText = "";
    });

    final faces = await _faceDetector.processImage(inputImage);
    String text = "Faces founded: ${faces.length}\n\n";

    if (inputImage.metadata?.size != null &&
        inputImage.metadata?.rotation != null) {
      final painter = FaceDetectorPainter(
        faces,
        inputImage.metadata!.size,
        inputImage.metadata!.rotation,
        CameraLensDirection.back,
      );

      setState(() {
        customPaint = CustomPaint(painter: painter);
      });

    } else {
      for (final face in faces) {
        text += "face: ${face.boundingBox}\n";
        text +=
            '${face.smilingProbability} | ${face.leftEyeOpenProbability} | ${face.rightEyeOpenProbability}\n';
      }

      setState(() {
        resultText = text;
      });
    }
  }
}
