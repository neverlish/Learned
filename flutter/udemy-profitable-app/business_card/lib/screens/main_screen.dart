import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  TextEditingController introduceController = TextEditingController();
  bool isEditMode = false;

  @override
  void initState() {
    super.initState();
    getIntroduceData();
  }

  void getIntroduceData() async {
    var sharedPref = await SharedPreferences.getInstance();
    String introduceMsg = sharedPref.getString('introduce').toString();
    introduceController.text = introduceMsg ?? '';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: const Icon(
          Icons.accessibility_new,
          color: Colors.black,
          size: 32,
        ),
        title: const Text(
          '발전하는 개발자 홍드로이드를 소개 합니다.',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.black,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: const EdgeInsets.all(16),
              width: double.infinity,
              height: 160,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.asset(
                  "assets/sample.jpeg",
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 16,
              ),
              child: const Row(
                children: [
                  SizedBox(
                    width: 150,
                    child: Text(
                      '이름',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Text(
                    '현진호',
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 16,
              ),
              child: const Row(
                children: [
                  SizedBox(
                    width: 150,
                    child: Text(
                      '나이',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Text(
                    '35',
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 16,
              ),
              child: const Row(
                children: [
                  SizedBox(
                    width: 150,
                    child: Text(
                      '취미',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Text(
                    '코딩',
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 16,
              ),
              child: const Row(
                children: [
                  SizedBox(
                    width: 150,
                    child: Text(
                      '직업',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Text(
                    '프로그래머',
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 16,
              ),
              child: const Row(
                children: [
                  SizedBox(
                    width: 150,
                    child: Text(
                      '학력',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Text(
                    '대졸',
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 16,
              ),
              child: const Row(
                children: [
                  SizedBox(
                    width: 150,
                    child: Text(
                      'MBTI',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Text(
                    'INTJ',
                  ),
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  margin: const EdgeInsets.only(
                    left: 16,
                    top: 16,
                  ),
                  child: const Text(
                    '자기소개',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                GestureDetector(
                  onTap: () async {
                    if (isEditMode == false) {
                      setState(() {
                        isEditMode = true;
                      });
                    } else {
                      if (introduceController.text.isEmpty) {
                        var snackBar = const SnackBar(
                          content: Text('자기소개 입력 값이 비어있습니다.'),
                          duration: Duration(seconds: 2),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                        return;
                      }
                      var sharedPref = await SharedPreferences.getInstance();
                      sharedPref.setString(
                        'introduce',
                        introduceController.text,
                      );

                      setState(() {
                        isEditMode = false;
                      });
                    }
                  },
                  child: Container(
                    margin: const EdgeInsets.only(
                      right: 16,
                      top: 16,
                    ),
                    child: Icon(
                      Icons.mode_edit,
                      color:
                          isEditMode == true ? Colors.blueAccent : Colors.black,
                      size: 24,
                    ),
                  ),
                ),
              ],
            ),
            Container(
              margin: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 8,
              ),
              child: TextField(
                maxLines: 5,
                controller: introduceController,
                enabled: isEditMode,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(
                      color: Color(0xffd9d9d9),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
