import 'package:flutter/material.dart';
import 'package:shake/shake.dart';
import 'package:shake_count_app/red_box.dart';
import 'package:velocity_x/velocity_x.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  void initState() {
    ShakeDetector.autoStart(
      onPhoneShake: () {
        setState(() {
          _counter++;
        });
      },
      shakeThresholdGravity: 1.5,
    );
    super.initState();
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    //
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          //
          //
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const RedBox()
                    .box
                    .padding(const EdgeInsets.all(30))
                    .color(Colors.blue)
                    .make(),
                Column(
                  children: [
                    const RedBox(),
                    '흔들어서 카운트를 올려보세요.'
                        .text
                        .color(Colors.red)
                        .bold
                        .white
                        .black
                        .size(20)
                        .isIntrinsic
                        .make()
                        .box
                        .rounded
                        .color(Colors.green)
                        .height(150)
                        .size(70, 70)
                        .make()
                        .pSymmetric(h: 20, v: 50),
                    // const Text(
                    //   '흔들어서 카운트를 올려보세요.',
                    //   // ).pOnly(left: 40, right: 40, top: 20, bottom: 20),
                    // ).pSymmetric(h: 20, v: 50),
                    const RedBox(),
                  ],
                ),
                const RedBox(),
              ],
            ),
            
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
