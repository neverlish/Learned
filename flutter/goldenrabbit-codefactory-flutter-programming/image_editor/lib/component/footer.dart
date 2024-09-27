import 'package:flutter/material.dart';

typedef OnEmoticonTap = void Function(int id);

class Footer extends StatelessWidget {
  final OnEmoticonTap onEmoticonTap;

  const Footer({super.key, required this.onEmoticonTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white.withOpacity(0.9),
      height: 150,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: List.generate(
            7,
            (index) => Padding(
              padding: EdgeInsets.symmetric(horizontal: 8.0),
              child: GestureDetector(
                onTap: () {
                  onEmoticonTap(index);
                },
                child: Image.asset(
                  'asset/img/emoticon_${index + 1}.png',
                  height: 100,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
