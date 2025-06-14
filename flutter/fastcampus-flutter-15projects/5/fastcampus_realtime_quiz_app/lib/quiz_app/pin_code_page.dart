import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class PinCodePage extends StatefulWidget {
  const PinCodePage({super.key});

  @override
  State<PinCodePage> createState() => _PinCodePageState();
}

class _PinCodePageState extends State<PinCodePage> {
  FirebaseAuth auth = FirebaseAuth.instance;
  TextEditingController pinTextEditingController = TextEditingController();
  TextEditingController nicknameTextEditingController = TextEditingController();

  String? uid;

  final codeItems = [];

  signInAnonymously() {
    auth.signInAnonymously().then((value) {
      setState(() {
        uid = value.user?.uid;
      });
    });
  }

  @override
  void initState() {
    super.initState();
    signInAnonymously();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("입장 코드 입력"),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              TextField(
                controller: pinTextEditingController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: "입장 코드 입력",
                  labelText: 'Pin Code',
                ),
              ),
              const SizedBox(height: 24),
              TextField(
                controller: nicknameTextEditingController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: "닉네임 입력",
                  labelText: '플레이어 명칭',
                ),
              ),
              const SizedBox(height: 24),
              MaterialButton(
                height: 72,
                color: Colors.indigo,
                child: const Text(
                  "입장하기",
                  style: TextStyle(
                    fontSize: 24,
                    color: Colors.white,
                  ),
                ),
                onPressed: () async {
                  if (pinTextEditingController.text.isEmpty) {
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text("핀코드를 입력해주세요."),
                        ),
                      );
                    }
                    return;
                  }

                  if (nicknameTextEditingController.text.isEmpty) {
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text("별명을 입력해주세요."),
                        ),
                      );
                    }
                    return;
                  }
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
