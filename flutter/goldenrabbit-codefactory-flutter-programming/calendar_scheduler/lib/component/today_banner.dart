import 'package:calendar_scheduler/const/colors.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class TodayBanner extends StatelessWidget {
  final DateTime selectedDate;
  final int count;

  const TodayBanner({
    super.key,
    required this.selectedDate,
    required this.count,
  });

  @override
  Widget build(BuildContext context) {
    final textStyle = TextStyle(
      fontWeight: FontWeight.w600,
      color: Colors.white,
    );

    return Container(
      color: PRIMARY_COLOR,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                '${selectedDate.year}년 ${selectedDate.month}월${selectedDate.day}일',
                style: textStyle,
              ),
            ),
            Text(
              '$count개',
              style: textStyle,
            ),
            SizedBox(width: 8.0),
            GestureDetector(
              onTap: () async {
                await GoogleSignIn().signOut();

                await FirebaseAuth.instance.signOut();

                Navigator.of(context).pop();
              },
              child: Icon(
                Icons.logout,
                size: 16.0,
                color: Colors.white,
              ),
            )
          ],
        ),
      ),
    );
  }
}
