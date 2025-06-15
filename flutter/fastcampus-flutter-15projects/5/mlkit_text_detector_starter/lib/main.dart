import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';
import 'package:image_picker/image_picker.dart';
import 'package:part5_mlkit_text_detector_starter/camera_view_page.dart';
import 'package:part5_mlkit_text_detector_starter/text_detector_painter.dart';

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
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  File? _image;
  bool _canProcess = true;
  bool _isBusy = false;
  String _text = "";
  CustomPaint? _customPaint;
  final _cameraLensDirection = CameraLensDirection.back;

  TextRecognitionScript _script = TextRecognitionScript.korean;
  TextRecognizer textRecognizer =
      TextRecognizer(script: TextRecognitionScript.korean);
  final ImagePicker _imagePicker = ImagePicker();

  @override
  void dispose() {
    _canProcess = false;
    textRecognizer.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: CameraView(
        customPaint: _customPaint,
        onImage: _processImage,
      ),
    );
  }

  Widget buildGalleryView() => Column(
        children: [
          DropdownButton(
            items: TextRecognitionScript.values
                .map(
                  (e) => DropdownMenuItem(value: e, child: Text(e.name)),
                )
                .toList(),
            value: _script,
            onChanged: (script) {
              setState(() {
                if (script != null) {
                  _script = script;
                  textRecognizer.close();
                  textRecognizer = TextRecognizer(script: _script);
                }
              });
            },
          ),
          _image != null
              ? SizedBox(
                  height: 320,
                  width: 320,
                  child: Image.file(
                    _image!,
                  ))
              : Container(
                  height: 240,
                  width: 240,
                  decoration: BoxDecoration(
                    border: Border.all(),
                  ),
                ),
          ElevatedButton(
            onPressed: () => _getImage(ImageSource.gallery),
            child: Text('갤러리 이미지 가져오기'),
          ),
          Expanded(
            child: SingleChildScrollView(
              child: Text(_text),
            ),
          )
        ],
      );

  Future _getImage(ImageSource source) async {
    setState(() {
      _image = null;
    });

    final pickedFile = await _imagePicker.pickImage(source: source);
    if (pickedFile != null) {
      _processFile(pickedFile.path);
    }
  }

  Future _processFile(String path) async {
    setState(() {
      _image = File(path);
    });

    final inputImage = InputImage.fromFilePath(path);
    _processImage(inputImage);
  }

  Future<void> _processImage(InputImage inputImage) async {
    if (!_canProcess) return;
    if (_isBusy) return;
    _isBusy = true;
    setState(() {
      _text = '';
    });

    final recognizedText = await textRecognizer.processImage(inputImage);

    if (inputImage.metadata?.size != null &&
        inputImage.metadata?.rotation != null) {
      final painter = TextRecognizerPainter(
        recognizedText,
        inputImage.metadata!.size,
        inputImage.metadata!.rotation,
        _cameraLensDirection,
      );
      _customPaint = CustomPaint(painter: painter);
      
    } else {
      _text = "recognized Text:  \n\n";
      for (var block in recognizedText.blocks) {
        _text += "Block: ${block.text} \n";
        for (var line in block.lines) {
          _text += "Line: ${line.text} \n\n";
          for (var element in line.elements) {
            _text += "Element: ${element.text} \n\n";
          }
        }
        _text += "\n\n";
      }
      setState(() {});
      _customPaint = null;
    }

    _isBusy = false;

    if (mounted) {
      setState(() {});
    }
  }
}
