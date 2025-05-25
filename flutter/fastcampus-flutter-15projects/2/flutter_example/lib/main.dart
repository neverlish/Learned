import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          
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
//     return Column(
//       children: [
//         Container(
//           width: double.infinity,
//           height: 200,
//           color: Colors.red,
//         ),
//         Expanded(child: Container(color: Colors.blue, height: 100)),
//         Flexible(child: Container(color: Colors.red, height: 100)),
//         // Flexible(flex: 1, child: Container(color: Colors.red)),
//         // Flexible(flex: 2, child: Container(color: Colors.blue)),
//         // Flexible(flex: 3, child: Container(color: Colors.green)),
//         // Flexible(flex: 4, child: Container(color: Colors.yellow)),
//       ],
//     );
//   }
// }

// class Body extends StatelessWidget {
//   const Body({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Row(
//       children: [
//         Container(
//           width: 50,
//           height: 200,
//           color: Colors.red,
//         ),
//         Expanded(child: Container(color: Colors.blue, width: 100)),
//         Flexible(child: Container(color: Colors.red, width: 100)),
//         // Flexible(flex: 1, child: Container(color: Colors.red)),
//         // Flexible(flex: 2, child: Container(color: Colors.blue)),
//         // Flexible(flex: 3, child: Container(color: Colors.green)),
//         // Flexible(flex: 4, child: Container(color: Colors.yellow)),
//       ],
//     );
//   }
// }

class Body extends StatelessWidget {
  const Body({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 100,
          height: 100,
          color: Colors.red,
          margin: const EdgeInsets.symmetric(vertical: 8),
        ),
        // Flexible(
        //   child: Container(
        //     color: Colors.blue,
        //     height: 100,
        //   ),
        // ),
        Expanded(
          child: Container(
            width: 100,
            height: 100,
            color: Colors.red,
            margin: const EdgeInsets.symmetric(vertical: 8),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                  Container(
                    color: Colors.blue,
                    height: 50,
                    width: 50,
                    margin: const EdgeInsets.symmetric(vertical: 8),
                  ),
                ],
              ),
            ),
          ),
        ),
        Container(
          width: 100,
          height: 100,
          color: Colors.red,
          margin: const EdgeInsets.symmetric(vertical: 8),
        ),
        Container(
          width: 100,
          height: 100,
          color: Colors.red,
          margin: const EdgeInsets.symmetric(vertical: 8),
        ),
      ],
    );
  }
}
