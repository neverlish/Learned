import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';
import 'package:image_picker/image_picker.dart';
import 'package:part5_mlkit_pose_detection_start/camera_view_page.dart';
import 'package:part5_mlkit_pose_detection_start/pose_painter.dart';

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
  File? _image;
  ImagePicker imagePicker = ImagePicker();
  String? resultText;

  final PoseDetector poseDetector = PoseDetector(
      options: PoseDetectorOptions(
    mode: PoseDetectionMode.single,
    model: PoseDetectionModel.accurate,
  ));

  CustomPaint? customPaint;

  @override
  void dispose() {
    poseDetector.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("자세 인식 앱"),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      // body: Column(
      //   children: [
      //     _image != null
      //         ? SizedBox(
      //             height: 400,
      //             width: 400,
      //             child: Image.file(_image!),
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
      //                 child: Text('자세에 대한 사진을 불러와주세요'),
      //               ),
      //             ),
      //           ),
      //     ElevatedButton(
      //       onPressed: () => _getImage(ImageSource.gallery),
      //       child: Text(
      //         '갤러리에서 이미지 가져오기',
      //       ),
      //     ),
      //     Expanded(
      //       child: SingleChildScrollView(
      //         child: Text(resultText ?? ''),
      //       ),
      //     ),
      //   ],
      // ),
      body: CameraView(
        customPaint: customPaint,
        onImage: _processImage,
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

    final inputImage = InputImage.fromFile(File(path));
    _processImage(inputImage);
  }

  Future<void> _processImage(InputImage inputImage) async {
    setState(() {
      resultText = '';
    });

    final poses = await poseDetector.processImage(inputImage);

    if (inputImage.metadata?.size != null &&
        inputImage.metadata?.rotation != null) {
      final painter = PosePainter(
        poses,
        inputImage.metadata!.size,
        inputImage.metadata!.rotation,
        CameraLensDirection.back,
      );
      setState(() {
        customPaint = CustomPaint(painter: painter);
      });
    } else {
      resultText = 'Poses 몇개? ${poses.length}';
      setState(() {});
    }

  }
}
