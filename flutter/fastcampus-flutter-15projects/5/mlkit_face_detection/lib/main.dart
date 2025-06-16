import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_mlkit_face_detection/google_mlkit_face_detection.dart';
import 'package:google_mlkit_face_mesh_detection/google_mlkit_face_mesh_detection.dart';
import 'package:google_mlkit_selfie_segmentation/google_mlkit_selfie_segmentation.dart';
import 'package:image_picker/image_picker.dart';

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

  @override
  void dispose() {
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
      body: Column(
        children: [
          image != null
              ? SizedBox(
                  height: 400,
                  width: 400,
                  child: Image.file(image!),
                )
              : Center(
                  child: Container(
                    height: 200,
                    width: 200,
                    margin: EdgeInsets.all(32),
                    decoration: BoxDecoration(
                      border: Border.all(),
                    ),
                    child: Center(
                      child: Text('얼굴 사진을 불러와주세요.'),
                    ),
                  ),
                ),
          ElevatedButton(
            onPressed: () {},
            child: Text('갤러리 이미지 가져오기'),
          ),
          Expanded(
            child: SingleChildScrollView(
              child: Text(resultText ?? ""),
            ),
          ),
        ],
      ),
    );
  }

  Future _getImage(ImageSource source) async {}

  Future _processFile(String path) async {}

  Future<void> _processImage(InputImage inputImage) async {}
}
