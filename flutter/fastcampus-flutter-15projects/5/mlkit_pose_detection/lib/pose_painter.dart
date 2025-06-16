import 'dart:math';
import 'dart:ui' as ui;
import 'dart:ui';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';
import 'package:part5_mlkit_pose_detection_start/translate_util.dart';

class PosePainter extends CustomPainter {
  PosePainter(
    this.poses,
    this.imageSize,
    this.rotation,
    this.cameraLensDirection,
  );

  final List<Pose> poses;
  final Size imageSize;
  final InputImageRotation rotation;
  final CameraLensDirection cameraLensDirection;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.0
      ..color = Colors.green;

    final leftPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..color = Colors.yellow;

    final rightPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..color = Colors.blueAccent;

    final paint3 = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..color = Colors.red;

    for (final pose in poses) {
      pose.landmarks.forEach((key, value) {
        canvas.drawCircle(
          Offset(
            translateX(value.x, size, imageSize, rotation, cameraLensDirection),
            translateY(value.y, size, imageSize, rotation, cameraLensDirection),
          ),
          1,
          paint,
        );
      });

      paintLine(
        PoseLandmarkType type1,
        PoseLandmarkType type2,
        Paint paintType,
      ) {
        final PoseLandmark joint1 = pose.landmarks[type1]!;
        final PoseLandmark joint2 = pose.landmarks[type2]!;

        canvas.drawLine(
          Offset(
            translateX(
                joint1.x, size, imageSize, rotation, cameraLensDirection),
            translateY(
                joint1.y, size, imageSize, rotation, cameraLensDirection),
          ),
          Offset(
            translateX(
                joint2.x, size, imageSize, rotation, cameraLensDirection),
            translateY(
                joint2.y, size, imageSize, rotation, cameraLensDirection),
          ),
          paintType,
        );
      }

      paintLine(
        PoseLandmarkType.leftShoulder,
        PoseLandmarkType.leftElbow,
        leftPaint,
      );

      paintLine(
        PoseLandmarkType.leftElbow,
        PoseLandmarkType.leftWrist,
        leftPaint,
      );

      paintLine(
        PoseLandmarkType.rightShoulder,
        PoseLandmarkType.rightElbow,
        rightPaint,
      );

      paintLine(
        PoseLandmarkType.rightElbow,
        PoseLandmarkType.rightWrist,
        rightPaint,
      );

      paintLine(
        PoseLandmarkType.leftHip,
        PoseLandmarkType.leftKnee,
        leftPaint,
      );

      paintLine(
        PoseLandmarkType.leftKnee,
        PoseLandmarkType.leftAnkle,
        leftPaint,
      );

      paintLine(
        PoseLandmarkType.rightHip,
        PoseLandmarkType.rightKnee,
        rightPaint,
      );

      paintLine(
        PoseLandmarkType.rightKnee,
        PoseLandmarkType.rightAnkle,
        rightPaint,
      );

      paintLine(
        PoseLandmarkType.rightShoulder,
        PoseLandmarkType.leftShoulder,
        paint3,
      );

      paintLine(
        PoseLandmarkType.rightHeel,
        PoseLandmarkType.leftHip,
        paint3,
      );

      var angleKnee = calculateAngle(
        pose,
        PoseLandmarkType.rightHip,
        PoseLandmarkType.rightKnee,
        PoseLandmarkType.rightAnkle,
      );

      var angleHip = calculateAngle(
        pose,
        PoseLandmarkType.rightShoulder,
        PoseLandmarkType.rightHip,
        PoseLandmarkType.rightKnee,
      );

      var kneeAngle = 180 - angleKnee;

      final Paint background = Paint()..color = Colors.black;

      final builder = ParagraphBuilder(ParagraphStyle(
        textAlign: TextAlign.left,
        fontSize: 12,
        textDirection: TextDirection.ltr,
      ));

      builder
          .pushStyle(ui.TextStyle(color: Colors.white, background: background));
      builder.addText(
          '${kneeAngle.toStringAsFixed(1)} | ${angleKnee.toStringAsFixed(1)}');

      builder.pop();

      final builder2 = ParagraphBuilder(ParagraphStyle(
        textAlign: TextAlign.left,
        fontSize: 12,
        textDirection: TextDirection.ltr,
      ));

      builder2
          .pushStyle(ui.TextStyle(color: Colors.white, background: background));
      builder2.addText(angleHip.toStringAsFixed(1));

      builder2.pop();

      final rkJoint = pose.landmarks[PoseLandmarkType.rightKnee]!;
      final rhJoint = pose.landmarks[PoseLandmarkType.rightHip]!;
      var textOffset = Offset(
        translateX(rkJoint.x, size, imageSize, rotation, cameraLensDirection),
        translateY(rkJoint.y, size, imageSize, rotation, cameraLensDirection),
      );

      canvas.drawParagraph(
        builder.build()
          ..layout(
            ParagraphConstraints(width: 100),
          ),
        textOffset,
      );

      textOffset = Offset(
        translateX(rhJoint.x, size, imageSize, rotation, cameraLensDirection),
        translateY(rhJoint.y, size, imageSize, rotation, cameraLensDirection),
      );

      canvas.drawParagraph(
        builder2.build()
          ..layout(
            ParagraphConstraints(width: 100),
          ),
        textOffset,
      );
    }
  }

  double calculateAngle(pose, a, b, c) {
    final PoseLandmark joint1 = pose.landmarks[a]!;
    final PoseLandmark joint2 = pose.landmarks[b]!;
    final PoseLandmark joint3 = pose.landmarks[c]!;

    var radians = atan2(joint3.y - joint2.y, joint3.x - joint2.x) -
        atan2(joint1.y - joint2.y, joint1.x - joint2.x);

    var angle = radians * (180 / pi);

    return angle;
  }

  @override
  bool shouldRepaint(covariant PosePainter oldDelegate) {
    return oldDelegate.imageSize != imageSize || oldDelegate.poses != poses;
  }
}
