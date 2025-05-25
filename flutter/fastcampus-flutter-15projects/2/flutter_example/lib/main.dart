import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: HomeWidget(),
      ),
    ),
  );
}

class HomeWidget extends StatelessWidget {
  const HomeWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Scaffold(
        body: ConstraintsWidget(),
      ),
    );
  }
}

// class ConstraintsWidget extends StatelessWidget {
//   const ConstraintsWidget({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       height: 500,
//       width: 500,
//       color: Colors.blue,
//       // child: SingleChi
//       //   child: Container(
//       //     color: Colors.red,
//       //     height: 300,
//       //     width: 300,
//       //   )
//       // child: Center(
//       //   child: Container(
//       //     // constraints: const BoxConstraints(
//       //     //     minHeight: 200, minWidth: 200, maxWidth: 250, maxHeight: 250),
//       //     constraints: BoxConstraints.tight(const Size(200, 200)),
//       //     color: Colors.red,
//       //     padding: const EdgeInsets.all(8),
//       //     child: Container(
//       //       margin: const EdgeInsets.all(20),
//       //       width: 50,
//       //       height: 50,
//       //       color: Colors.green,
//       //     ),
//       //   ),
//       // ),
//       // child: Positioned(
//       //   child: UnconstrainedBox(
//       //     child: Container(
//       //       width: 300,
//       //       height: 700,
//       //       color: Colors.green,
//       //     ),
//       //   ),
//       // ),
//       child: Center(
//         child: OverflowBox(
//           child: Container(
//             width: 300,
//             height: 700,
//             color: Colors.green,
//           ),
//         ),
//       ),
//     );
//   }
// }

class ConstraintsWidget extends StatelessWidget {
  const ConstraintsWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Flexible(
          child: Container(
            color: Colors.blue,
            child: const Text(
              "Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!",
              style: TextStyle(
                fontSize: 30,
              ),
            ),
          ),
        ),
        Flexible(
          child: Container(
            color: Colors.red,
            child: const Text("Hello world!"),
          ),
        ),
      ],
    );
  }
}
