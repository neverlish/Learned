import 'package:flutter/cupertino.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

abstract class UrlNavigationDecision {
  bool isMatch(Uri uri);

  NavigationDecision decide(
    BuildContext context,
    WebViewController controller,
    Uri uri,
    bool isMainFrame,
  );
}

class CustomerServiceDecision implements UrlNavigationDecision {
  @override
  bool isMatch(Uri uri) {
    return uri.host == 'day1fastcampussupport.zendesk.com';
  }

  @override
  NavigationDecision decide(
    BuildContext context,
    WebViewController controller,
    Uri uri,
    bool isMainFrame,
  ) {
    launchUrl(
      uri,
      mode: LaunchMode.externalApplication,
    );

    return NavigationDecision.prevent;
  }
}
