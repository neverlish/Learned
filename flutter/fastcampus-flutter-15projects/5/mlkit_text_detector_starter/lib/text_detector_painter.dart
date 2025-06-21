import 'dart:io';
import 'dart:ui' as ui;
import 'dart:ui';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';
import 'package:part5_mlkit_text_detector_starter/translate_util.dart';

class TextRecognizerPainter extends CustomPainter {
  TextRecognizerPainter(
    this.recognizedText,
    this.imageSize,
    this.rotation,
    this.cameraLensDirection,
  );

  final RecognizedText recognizedText;
  final Size imageSize;
  final InputImageRotation rotation;
  final CameraLensDirection cameraLensDirection;

  @override
  void paint(Canvas canvas, Size canvasSize) {
    final Paint paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.0
      ..color = Colors.red;

    final Paint background = Paint()..color = Colors.black;

    for (final textBlock in recognizedText.blocks) {
      final builder = ParagraphBuilder(
        ParagraphStyle(
          textAlign: TextAlign.left,
          fontSize: 12,
          textDirection: TextDirection.ltr,
        ),
      );

      builder.pushStyle(ui.TextStyle(
        color: Colors.white,
        background: background,
      ));

      builder.addText(textBlock.text);
      builder.pop();

      final left = translateX(
        textBlock.boundingBox.left,
        canvasSize,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final top = translateY(
        textBlock.boundingBox.top,
        canvasSize,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final right = translateX(
        textBlock.boundingBox.right,
        canvasSize,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final List<Offset> cornerPoints = [];

      for (final point in textBlock.cornerPoints) {
        double dx = translateX(point.x.toDouble(), canvasSize, imageSize,
            rotation, cameraLensDirection);
        double dy = translateY(point.y.toDouble(), canvasSize, imageSize,
            rotation, cameraLensDirection);

        if (Platform.isAndroid) {
          switch (cameraLensDirection) {
            case CameraLensDirection.back:
              switch (rotation) {
                case InputImageRotation.rotation0deg:
                case InputImageRotation.rotation90deg:
                  dx = canvasSize.width -
                      translateX(point.y.toDouble(), canvasSize, imageSize,
                          rotation, cameraLensDirection);
                  dy = canvasSize.height -
                      translateY(point.x.toDouble(), canvasSize, imageSize,
                          rotation, cameraLensDirection);
                case InputImageRotation.rotation180deg:
                case InputImageRotation.rotation270deg:
              }
              break;
            case CameraLensDirection.front:
              break;
            case CameraLensDirection.external:
              break;
          }
        }
        cornerPoints.add(Offset(dx, dy));
      }

      cornerPoints.add(cornerPoints.first);

      canvas.drawPoints(
        PointMode.polygon,
        cornerPoints,
        paint,
      );

      canvas.drawParagraph(
          builder.build()
            ..layout(ParagraphConstraints(width: (right - left).abs())),
          Offset(left, top));
    }
  }

  @override
  bool shouldRepaint(TextRecognizerPainter oldDelegate) {
    return oldDelegate.recognizedText != recognizedText;
  }
}
