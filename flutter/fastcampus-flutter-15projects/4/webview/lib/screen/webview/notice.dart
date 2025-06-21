import 'dart:io';

import 'package:cupertino_will_pop_scope/cupertino_will_pop_scope.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/widget/loading.dart';
import 'package:fk_user_agent/fk_user_agent.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

// ignore: depend_on_referenced_packages
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

import 'navigation_decision.dart';

class Notice extends StatefulWidget {
  const Notice({
    Key? key,
  }) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _NoticeState createState() => _NoticeState();
}

class _NoticeState extends State<Notice> {
  late final WebViewController _controller;

  final List<UrlNavigationDecision> _decisions = [
    CustomerServiceDecision(),
  ];

  bool _isShowLoadingIndicator = true;

  @override
  void initState() {
    super.initState();
    _initializeWebViewController();
  }

  Future<void> _initializeWebViewController() async {
    // #docregion platform_features
    late final PlatformWebViewControllerCreationParams params;
    if (WebViewPlatform.instance is WebKitWebViewPlatform) {
      params = WebKitWebViewControllerCreationParams(
        allowsInlineMediaPlayback: true,
      );
    } else {
      params = const PlatformWebViewControllerCreationParams();
    }

    _controller = WebViewController.fromPlatformCreationParams(params);
    // #enddocregion platform_features

    _controller
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            debugPrint('Page started loading: $url');
            if (mounted) {
              setState(() {
                _isShowLoadingIndicator = true;
              });
            }
          },
          onPageFinished: (String url) {
            debugPrint('Page finished loading: $url');

            if (mounted) {
              setState(() {
                _isShowLoadingIndicator = false;
              });
            }
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('''
Page resource error:
  code: ${error.errorCode}
  description: ${error.description}
  errorType: ${error.errorType}
  isForMainFrame: ${error.isForMainFrame}
          ''');

            if (mounted) {
              setState(() {
                _isShowLoadingIndicator = false;
              });
            }
          },
          onNavigationRequest: _navigationDecision,
        ),
      );

    /// TODO: User-Agent
    await FkUserAgent.init();
    final packageInfo = await PackageInfo.fromPlatform();
    await _controller
        .setUserAgent('${FkUserAgent.webViewUserAgent} fastcampus(${packageInfo.version})');

    /// TODO: http://example.com
    /// iOS - NSAppTransportSecurity
    /// android - usesCleartextTraffic, networkSecurityConfig
    // _controller.loadRequest(Uri.parse('http://example.com'));

    _controller.loadRequest(Uri.parse('https://fastcampus.co.kr/info/notices'));
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ConditionalWillPopScope(
      /// TODO: onWillPop
      onWillPop: () => _willPop(),
      shouldAddCallback: !Platform.isIOS,
      child: AnnotatedRegion(
        value: SystemUiOverlayStyle.dark,
        child: Scaffold(
          backgroundColor: Colors.white,
          appBar: AppBar(
            title: const Text('공지사항'),
            titleTextStyle: const TextStyle(
              color: Colors.black87,
              fontWeight: FontWeight.w600,
              fontSize: 16,
            ),
            leading: BackButton(
              color: Colors.black87,
              onPressed: () {
                /// TODO: why? Nav.pop
                Nav.pop(context);
              },
            ),
            backgroundColor: Colors.white,
            elevation: 1,
            // This drop down menu demonstrates that Flutter widgets can be shown over the web view.
          ),
          body: Stack(
            children: <Widget>[
              WebViewWidget(controller: _controller),
              if (_isShowLoadingIndicator) LoadingIndicator.small(),
            ],
          ),
        ),
      ),
    );
  }

  Future<NavigationDecision> _navigationDecision(NavigationRequest request) async {
    final uri = Uri.parse(request.url);
    final bool isMainFrame = request.isMainFrame;

    debugPrint('url: $uri, isForMainFrame: $isMainFrame');

    /// 고객센터 바로가기
    /// 외부 브라우저로 처리
    /// TODO: navigation decision 1번
    if (uri.host.contains('day1fastcampussupport.zendesk.com')) {
      launchUrl(
        uri,
        mode: LaunchMode.externalApplication,
      );

      return NavigationDecision.prevent;
    }

    /// TODO: navigation decision 2번
    // for (final decision in _decisions) {
    //   if (decision.isMatch(uri)) {
    //     return decision.decide(context, _controller, uri, isMainFrame);
    //   }
    // }

    return NavigationDecision.navigate;
  }

  Future<bool> _willPop() async {
    /// TODO: OS 별 분기 처리
    if (Platform.isIOS) {
      return true;
    } else if (Platform.isAndroid) {
      final canGoBack = await _controller.canGoBack();
      if (canGoBack) {
        _controller.goBack();
        return false;
      } else {
        return true;
      }
    }

    return true;
  }
}
