import 'package:flutter/material.dart';

class SearchFragment extends StatelessWidget {
  const SearchFragment({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      child: SafeArea(
        bottom: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Container(
                color: Colors.green.withOpacity(0.2),
                child: const Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(),
                    ]),
              ),
            )
          ],
        ),
      ),
    );
  }
}
