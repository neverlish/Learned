import 'package:flutter/material.dart' hide Ink;

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepOrange,
        ),
      ),
      home: const DigitalInkApp(),
    );
  }
}

class DigitalInkApp extends StatefulWidget {
  const DigitalInkApp({super.key});

  @override
  State<DigitalInkApp> createState() => _DigitalInkAppState();
}

class _DigitalInkAppState extends State<DigitalInkApp> {
  String _language = "en";
  final _languages = ["en", "ko", "ja", "zh-Hani"];

  final String _recognizedText = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text('디지털 서명 인식'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                DropdownButton<String>(
                  value: _language,
                  items: _languages
                      .map(
                        (e) => DropdownMenuItem(
                          value: e,
                          child: Text(e),
                        ),
                      )
                      .toList(),
                  onChanged: (v) {
                    if (v != null) {
                      setState(() {
                        _language = v;
                      });
                    }
                  },
                ),
                SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () {},
                  child: Text(
                    '모델 체크',
                  ),
                ),
              ],
            ),
            Row(
              children: [
                ElevatedButton(
                  onPressed: () {},
                  child: Text(
                    '모델 다운로드',
                  ),
                ),
                SizedBox(width: 16),
                ElevatedButton(
                  onPressed: () {},
                  child: Text('모델 삭제'),
                ),
              ],
            ),
            Divider(),
            Text(
              '서명하기',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
            Expanded(
              child: Container(
                margin: EdgeInsets.only(top: 16),
                decoration: BoxDecoration(
                  border: Border.all(),
                ),
              ),
            ),
            if (_recognizedText.isNotEmpty)
              SizedBox(
                height: 160,
                child: SingleChildScrollView(
                  child: Text(
                    'Candidates: $_recognizedText',
                    style: TextStyle(
                      fontSize: 18,
                    ),
                  ),
                ),
              ),
            GestureDetector(
              onTap: () {},
              child: Container(
                height: 64,
                margin: EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: Colors.black,
                ),
                child: Center(
                  child: Text(
                    '확인',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.clear),
      ),
    );
  }
}
