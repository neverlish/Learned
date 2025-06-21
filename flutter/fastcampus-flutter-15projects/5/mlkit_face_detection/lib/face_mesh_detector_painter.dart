import 'dart:ui';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_face_mesh_detection/google_mlkit_face_mesh_detection.dart';
import 'package:part5_mlkit_face_detection_start/translate_util.dart';

class FaceMeshDetectorPainter extends CustomPainter {
  FaceMeshDetectorPainter(
    this.meshes,
    this.imageSize,
    this.rotation,
    this.cameraLensDirection,
  );

  final List<FaceMesh> meshes;
  final Size imageSize;
  final InputImageRotation rotation;
  final CameraLensDirection cameraLensDirection;

  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint1 = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0
      ..color = Colors.red;
    final Paint paint2 = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 1.4
      ..color = Colors.white;
    final Paint paint3 = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 4
      ..color = Colors.blue;

    for (final mesh in meshes) {
      final left = translateX(
        mesh.boundingBox.left,
        size,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final right = translateX(
        mesh.boundingBox.right,
        size,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final top = translateY(
        mesh.boundingBox.top,
        size,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      final bottom = translateY(
        mesh.boundingBox.bottom,
        size,
        imageSize,
        rotation,
        cameraLensDirection,
      );

      canvas.drawRect(
        Rect.fromLTRB(left, top, right, bottom),
        paint1,
      );

      paintTriangle(FaceMeshTriangle triangle) {
        final List<Offset> cornerPoints = [];
        for (var i = 0; i < triangle.points.length; i++) {
          final point = triangle.points[i];

          final double x = translateX(
            point.x.toDouble(),
            size,
            imageSize,
            rotation,
            cameraLensDirection,
          );

          final double y = translateY(
            point.y.toDouble(),
            size,
            imageSize,
            rotation,
            cameraLensDirection,
          );

          cornerPoints.add(Offset(x, y));
        }

        cornerPoints.add(cornerPoints.first);

        canvas.drawPoints(
          PointMode.polygon,
          cornerPoints,
          paint2,
        );
      }

      for (final triangle in mesh.triangles) {
        paintTriangle(triangle);
      }
    }
  }

  @override
  bool shouldRepaint(FaceMeshDetectorPainter oldDelegate) {
    return oldDelegate.imageSize != imageSize || oldDelegate.meshes != meshes;
  }
}
