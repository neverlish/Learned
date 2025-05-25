import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Widget를 상하로 배치하기"),
        ),
        body: const Body(),
      ),
    ),
  );
}

// class Body extends StatelessWidget {
//   const Body({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       height: 300,
//       width: double.infinity,
//       color: Colors.grey,
//       child: Column(
//         mainAxisSize: MainAxisSize.min,
//         mainAxisAlignment: MainAxisAlignment.center,
//         crossAxisAlignment: CrossAxisAlignment.start,
//         children: [
//           Container(
//             width: 100,
//             height: 80,
//             color: Colors.red,
//             child: const Text("Container 1"),
//           ),
//           Container(
//             width: 100,
//             height: 80,
//             color: Colors.green,
//             child: const Text("Container 2"),
//           ),
//           Container(
//             width: 100,
//             height: 80,
//             color: Colors.blue,
//             child: const Text("Container 3"),
//           ),
//         ],
//       ),
//     );
//   }
// }

class Body extends StatelessWidget {
  const Body({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
          Container(
            color: Colors.grey,
            height: 100,
            width: 100,
            margin: const EdgeInsets.symmetric(horizontal: 8),
          ),
        ],
      ),
    );
  }
}
