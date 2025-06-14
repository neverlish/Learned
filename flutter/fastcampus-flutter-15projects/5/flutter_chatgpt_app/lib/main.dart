import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin {
  TextEditingController messageTextController = TextEditingController();

  static const String _kStrings = "Fastcampus Flutter ChatGPT";
  String get _currentString => _kStrings;

  ScrollController scrollController = ScrollController();
  late Animation<int> _characterCount;
  late AnimationController animationController;

  setupAnimations() {
    animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    );
    _characterCount = StepTween(begin: 0, end: _currentString.length).animate(
      CurvedAnimation(
        parent: animationController,
        curve: Curves.easeIn,
      ),
    );
    animationController.addListener(() {
      setState(() {});
    });
    animationController.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        Future.delayed(const Duration(seconds: 1)).then(
          (value) => {
            animationController.reverse(),
          },
        );
      } else if (status == AnimationStatus.dismissed) {
        Future.delayed(const Duration(seconds: 1)).then(
          (value) => {
            animationController.forward(),
          },
        );
      }
    });

    animationController.forward();
  }

  @override
  void initState() {
    super.initState();
    setupAnimations();
  }

  @override
  void dispose() {
    messageTextController.dispose();
    scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Align(
                alignment: Alignment.centerRight,
                child: Card(
                  child: PopupMenuButton(
                    itemBuilder: (context) {
                      return [
                        const PopupMenuItem(
                          child: ListTile(
                            title: Text('히스토리'),
                          ),
                        ),
                        const PopupMenuItem(
                          child: ListTile(
                            title: Text('설정'),
                          ),
                        ),
                        const PopupMenuItem(
                          child: ListTile(
                            title: Text('새로운 채팅'),
                          ),
                        ),
                      ];
                    },
                  ),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  child: Center(
                    child: AnimatedBuilder(
                      animation: _characterCount,
                      builder: (context, child) {
                        String text =
                            _currentString.substring(0, _characterCount.value);
                        return Row(
                          children: [
                            Text(
                              text,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 24,
                              ),
                            ),
                            CircleAvatar(
                              radius: 8,
                              backgroundColor: Colors.orange[200],
                            ),
                          ],
                        );
                      },
                    ),
                  ),
                ),
                // child: Container(

                //   child: ListView.builder(
                //     itemCount: 100,
                //     itemBuilder: (context, index) {
                //       if (index % 2 == 0) {
                //         return const Padding(
                //           padding: EdgeInsets.symmetric(vertical: 16),
                //           child: Row(
                //             children: [
                //               CircleAvatar(),
                //               SizedBox(width: 8),
                //               Expanded(
                //                 child: Column(
                //                   crossAxisAlignment: CrossAxisAlignment.start,
                //                   children: [
                //                     Text('User'),
                //                     Text('message'),
                //                   ],
                //                 ),
                //               )
                //             ],
                //           ),
                //         );
                //       }
                //       return const Row(
                //         children: [
                //           CircleAvatar(
                //             backgroundColor: Colors.teal,
                //           ),
                //           SizedBox(width: 8),
                //           Expanded(
                //             child: Column(
                //               crossAxisAlignment: CrossAxisAlignment.start,
                //               children: [
                //                 Text('ChatGPT'),
                //                 Text('OpenAI OpenAI OpenAI OpenAI'),
                //               ],
                //             ),
                //           ),
                //         ],
                //       );
                //     },
                //   ),
                // ),
              ),
              Dismissible(
                key: const Key('chat-bar'),
                direction: DismissDirection.startToEnd,
                onDismissed: (d) {
                  if (d == DismissDirection.startToEnd) {
                    //
                  }
                },
                background: const Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text('New Chat'),
                  ],
                ),
                confirmDismiss: (d) async {
                  if (d == DismissDirection.startToEnd) {
                    //
                  }
                  return null;
                },
                child: Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(32),
                          border: Border.all(),
                        ),
                        child: TextField(
                          controller: messageTextController,
                          decoration: const InputDecoration(
                            border: InputBorder.none,
                            hintText: 'Message',
                          ),
                        ),
                      ),
                    ),
                    IconButton(
                      iconSize: 42,
                      onPressed: () {},
                      icon: const Icon(Icons.arrow_circle_up),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
