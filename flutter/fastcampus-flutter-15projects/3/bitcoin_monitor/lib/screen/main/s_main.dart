import 'dart:convert';
import 'dart:math';

import 'package:fast_app_base/common/cli_common.dart';
import 'package:flutter/material.dart';
import 'package:live_background/object/palette.dart';
import 'package:live_background/object/particle_shape_type.dart';
import 'package:live_background/widget/live_background_widget.dart';
import 'package:web_socket_channel/io.dart';

import '../../common/common.dart';
import '../../common/widget/animated_number_text.dart';
import '../../common/widget/line_chart.dart';
import 'w_menu_drawer.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => MainScreenState();
}

class MainScreenState extends State<MainScreen> {
  late final channel = IOWebSocketChannel.connect(
      'wss://stream.binance.com:9443/ws/btcusdt@trade');
  late final Stream<dynamic> stream;

  String priceString = "Loading";
  final List<double> priceList = [];

  final intervalDuration = 1.seconds;
  double maxPrice = 0;
  DateTime lastUpdatedTime = DateTime.now();

  @override
  void initState() {
    stream = channel.stream;
    stream.listen((event) {
      final obj = json.decode(event);
      final double price = double.parse(obj['p']);

      if (DateTime.now().difference(lastUpdatedTime) > intervalDuration) {
        lastUpdatedTime = DateTime.now();
        setState(() {
          maxPrice = max(price, maxPrice);
          priceList.add(price);
          priceString = price.toDoubleStringAsFixed();
        });
      }
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const MenuDrawer(),
      body: Stack(
        children: [
          const LiveBackgroundWidget(
            shape: ParticleShapeType.square,
            velocityY: -7,
            particleMinSize: 5,
            particleMaxSize: 25,
            particleCount: 3000,
            palette: Palette(
              colors: [
                Color(0xff165B33),
                Color(0xff83ec00),
              ],
            ),
          ),
          SafeArea(
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AnimatedNumberText(
                    priceString,
                    textStyle: const TextStyle(
                        fontSize: 50, fontWeight: FontWeight.bold),
                    duration: 50.ms,
                  ),
                  LineChartWidget(
                    priceList,
                    maxPrice: maxPrice,
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
