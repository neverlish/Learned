import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class HomeSecreen extends StatelessWidget {
  WebViewController webViewController = WebViewController()
    ..loadRequest(Uri.parse('https://blog.codefactory.ai/'))
    ..setJavaScriptMode(JavaScriptMode.unrestricted);

  HomeSecreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.orange,
        title: Text('Code Factory'),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: () {
              webViewController
                  .loadRequest(Uri.parse('https://blog.codefactory.ai/'));
            },
            icon: Icon(Icons.home),
          )
        ],
      ),
      body: WebViewWidget(
        controller: webViewController,
      ),
    );
  }
}
