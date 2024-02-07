import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Archive Idea',
          style: TextStyle(
            color: Colors.black,
            fontSize: 32,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Container(
        margin: const EdgeInsets.all(16),
        child: ListView.builder(
          itemCount: 10,
          itemBuilder: (context, index) {
            return listItem(index);
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xff7f52fd).withOpacity(0.7),
        child: Image.asset(
          'assets/idea.png',
          width: 48,
          height: 48,
        ),
      ),
    );
  }

  Widget listItem(int index) {
    return Container(
      height: 82,
      margin: const EdgeInsets.only(top: 16),
      decoration: ShapeDecoration(
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: Color(0xffd9d9d9), width: 1),
          borderRadius: BorderRadius.circular(10),
        ),
      ),
      child: Stack(
        alignment: Alignment.centerLeft,
        children: [
          Container(
            margin: const EdgeInsets.only(left: 16, bottom: 16),
            child: const Text(
              '# 환경보존 문제해결 앱 아이디어',
              style: TextStyle(
                fontSize: 16,
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: Container(
              margin: const EdgeInsets.only(right: 16, bottom: 8),
              child: const Text(
                '2023.10.03 09:00',
                style: TextStyle(
                  color: Color(0xffaeaeae),
                  fontSize: 10,
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: Container(
              margin: const EdgeInsets.only(left: 16, bottom: 8),
              child: RatingBar.builder(
                initialRating: 3,
                minRating: 1,
                direction: Axis.horizontal,
                itemCount: 5,
                itemSize: 16,
                itemPadding: const EdgeInsets.symmetric(horizontal: 0),
                itemBuilder: (context, index) {
                  return const Icon(
                    Icons.star,
                    color: Colors.amber,
                  );
                },
                ignoreGestures: true,
                updateOnDrag: false,
                onRatingUpdate: (value) {},
              ),
            ),
          )
        ],
      ),
    );
  }
}
