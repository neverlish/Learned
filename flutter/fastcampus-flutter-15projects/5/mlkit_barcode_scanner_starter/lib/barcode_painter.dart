import 'dart:io';
import 'dart:ui' as ui;
import 'dart:ui';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_barcode_scanning/google_mlkit_barcode_scanning.dart';
import 'package:part5_mlkit_barcode_scanner_starter/translate_util.dart';

class BarcodeDetectorPainter extends CustomPainter {
  BarcodeDetectorPainter(
    this.barcodes,
    this.imageSize,
    this.rotation,
    this.cameraLensDirection,
  );

  final List<Barcode> barcodes;
  final Size imageSize;
  final InputImageRotation rotation;
  final CameraLensDirection cameraLensDirection;

  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.0
      ..color = Colors.red;
    final Paint background = Paint()..color = Colors.black;

    for (final barcode in barcodes) {
      final ParagraphBuilder builder = ParagraphBuilder(ParagraphStyle(
          textAlign: TextAlign.left,
          fontSize: 16,
          textDirection: TextDirection.ltr));
      builder
          .pushStyle(ui.TextStyle(color: Colors.red, background: background));
      builder.addText("${barcode.displayValue}");
      builder.pop();

      final left = translateX(
        barcode.boundingBox.left,
        size,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final top = translateY(
        barcode.boundingBox.top,
        size,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final right = translateX(
        barcode.boundingBox.right,
        size,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final List<Offset> cornerPoints = [];

      for (final point in barcode.cornerPoints) {
        final double dx = translateX(
          point.x.toDouble(),
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );
        final double dy = translateY(
          point.y.toDouble(),
          size,
          imageSize,
          rotation,
          cameraLensDirection,
        );

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
          Offset(
              Platform.isAndroid &&
                      cameraLensDirection == CameraLensDirection.front
                  ? right
                  : left,
              top));
    }
  }

  @override
  bool shouldRepaint(BarcodeDetectorPainter oldDelegate) {
    return oldDelegate.imageSize != imageSize ||
        oldDelegate.barcodes != barcodes;
  }
}
