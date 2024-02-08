import 'package:archive_idea/data/idea_info.dart';
import 'package:archive_idea/database/database_helper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:intl/intl.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  var dbHelper = DatabaseHelper();
  List<IdeaInfo> lstIdeaInfo = [];

  @override
  void initState() {
    super.initState();
    getIdeaInfo();
    // setInsertIdeaInfo();
  }

  Future getIdeaInfo() async {
    await dbHelper.initDatabase();
    lstIdeaInfo = await dbHelper.getAllIdeaInfo();
    lstIdeaInfo.sort((a, b) => b.createdAt.compareTo(a.createdAt));
    setState(() {});
  }

  Future setInsertIdeaInfo() async {
    await dbHelper.initDatabase();
    await dbHelper.insertIdeaInfo(
      IdeaInfo(
        title: '# 환경보존 문제해결 앱 아이디어',
        motive: '길가다가 쓰레기 주우면서 알게됨',
        content: '자세한 내용입니다... 자세한 내용',
        priority: 4,
        feedback: '피드백 사항입니다.',
        createdAt: DateTime.now().millisecondsSinceEpoch,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Archive Idea',
          style: TextStyle(
            color: Colors.black,
            fontSize: 32,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Container(
        margin: const EdgeInsets.all(16),
        child: ListView.builder(
          itemCount: lstIdeaInfo.length,
          itemBuilder: (context, index) {
            return listItem(index);
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xff7f52fd).withOpacity(0.7),
        child: Image.asset(
          'assets/idea.png',
          width: 48,
          height: 48,
        ),
      ),
    );
  }

  Widget listItem(int index) {
    return Container(
      height: 82,
      margin: const EdgeInsets.only(top: 16),
      decoration: ShapeDecoration(
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: Color(0xffd9d9d9), width: 1),
          borderRadius: BorderRadius.circular(10),
        ),
      ),
      child: Stack(
        alignment: Alignment.centerLeft,
        children: [
          Container(
            margin: const EdgeInsets.only(left: 16, bottom: 16),
            child: Text(
              lstIdeaInfo[index].title,
              style: const TextStyle(
                fontSize: 16,
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: Container(
              margin: const EdgeInsets.only(right: 16, bottom: 8),
              child: Text(
                DateFormat("yyyy.MM.dd HH:mm").format(
                  DateTime.fromMillisecondsSinceEpoch(
                    lstIdeaInfo[index].createdAt,
                  ),
                ),
                style: const TextStyle(
                  color: Color(0xffaeaeae),
                  fontSize: 10,
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: Container(
              margin: const EdgeInsets.only(left: 16, bottom: 8),
              child: RatingBar.builder(
                initialRating: lstIdeaInfo[index].priority.toDouble(),
                minRating: 1,
                direction: Axis.horizontal,
                itemCount: 5,
                itemSize: 16,
                itemPadding: const EdgeInsets.symmetric(horizontal: 0),
                itemBuilder: (context, index) {
                  return const Icon(
                    Icons.star,
                    color: Colors.amber,
                  );
                },
                ignoreGestures: true,
                updateOnDrag: false,
                onRatingUpdate: (value) {},
              ),
            ),
          )
        ],
      ),
    );
  }
}
