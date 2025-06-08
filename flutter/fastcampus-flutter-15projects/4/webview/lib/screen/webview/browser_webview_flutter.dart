import 'dart:io';

import 'package:fast_app_base/common/widget/loading.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

// ignore: depend_on_referenced_packages
import 'package:webview_flutter_android/webview_flutter_android.dart';

// ignore: depend_on_referenced_packages
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

import '../dialog/d_message.dart';

class Browser extends StatefulWidget {
  final String url;

  const Browser({
    Key? key,
    required this.url,
  }) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _BrowserState createState() => _BrowserState();
}

class _BrowserState extends State<Browser> {
  late final WebViewController _controller;

  Uri? _uri;
  double progress = 0;
  bool _isShowLoadingIndicator = true;

  @override
  void initState() {
    super.initState();
    _uri = Uri.tryParse(widget.url);
    _initializeWebViewController();
  }

  void _initializeWebViewController() {
    // #docregion platform_features
    late final PlatformWebViewControllerCreationParams params;
    if (WebViewPlatform.instance is WebKitWebViewPlatform) {
      params = WebKitWebViewControllerCreationParams(
        allowsInlineMediaPlayback: true,
      );
    } else {
      params = const PlatformWebViewControllerCreationParams();
    }

    final WebViewController controller = WebViewController.fromPlatformCreationParams(params);
    // #enddocregion platform_features

    controller
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            debugPrint('WebView is loading (progress : $progress%)');
          },
          onPageStarted: (String url) {
            debugPrint('Page started loading: $url');
            setState(() {
              _isShowLoadingIndicator = true;
            });
          },
          onPageFinished: (String url) {
            debugPrint('Page finished loading: $url');

            setState(() {
              _isShowLoadingIndicator = false;
            });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('''
Page resource error:
  code: ${error.errorCode}
  description: ${error.description}
  errorType: ${error.errorType}
  isForMainFrame: ${error.isForMainFrame}
          ''');

            setState(() {
              _isShowLoadingIndicator = false;
            });
          },
          onNavigationRequest: _navigationDecision,
          onUrlChange: (UrlChange change) {
            debugPrint('url change to ${change.url}');
          },
        ),
      )
      ..addJavaScriptChannel(
        'Toaster',
        onMessageReceived: (JavaScriptMessage message) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(message.message)),
          );
        },
      );

    if (_uri != null) {
      controller.loadRequest(_uri!);
    }

    // #docregion platform_features
    if (controller.platform is AndroidWebViewController) {
      AndroidWebViewController.enableDebugging(true);
      (controller.platform as AndroidWebViewController).setMediaPlaybackRequiresUserGesture(false);
    }
    // #enddocregion platform_features

    _controller = controller;
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion(
      value: SystemUiOverlayStyle.dark,
      child: Material(
        color: Colors.white,
        child: SafeArea(
          top: true,
          left: false,
          right: false,
          bottom: false,
          child: Scaffold(
            body: Stack(
              children: <Widget>[
                Column(
                  children: <Widget>[
                    Expanded(
                      child: WebViewWidget(controller: _controller),
                    ),
                    SizedBox(
                      height: MediaQuery.of(context).padding.bottom + 50.0,
                    ),
                  ],
                ),

                /// TODO: LoadingIndicator
                if (_isShowLoadingIndicator) LoadingIndicator.small(),
              ],
            ),
            bottomSheet: _buildBottomSheet(context),
          ),
        ),
      ),
    );
  }

  /// TODO: BottomSheet
  Widget _buildBottomSheet(BuildContext context) {
    final bottomPadding = MediaQuery.of(context).padding.bottom;
    final theme = context.theme;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        /// TODO: Progress Indicator
        SizedBox(
          height: progress < 1.0 ? 4 : 0,
          child: progress < 1.0
              ? LinearProgressIndicator(
                  value: progress,
                )
              : Container(),
        ),
        Container(
          height: 50.0 + bottomPadding,
          color: theme.colorScheme.background,
          child: Padding(
            padding: EdgeInsets.only(
              bottom: bottomPadding,
            ),
            child: Stack(
              children: <Widget>[
                const Divider(height: 0.5),
                Container(
                  height: 50,
                  padding: const EdgeInsets.only(
                    left: 20,
                    right: 20,
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      /// TODO: FutureBuilder
                      FutureBuilder<bool>(
                        future: _controller.canGoBack(),
                        builder: (context, snapshot) {
                          final isCan = snapshot.data ?? false;
                          return Opacity(
                            opacity: isCan ? 1.0 : 0.3,
                            child: IgnorePointer(
                              ignoring: !isCan,
                              child: GestureDetector(
                                behavior: HitTestBehavior.translucent,
                                onTap: isCan
                                    ? () {
                                        _controller.goBack();
                                      }
                                    : null,
                                child: Container(
                                  color: Colors.transparent,
                                  constraints: const BoxConstraints(
                                    minWidth: 50,
                                    minHeight: 50,
                                  ),
                                  child: Icon(
                                    Icons.arrow_back,
                                    color: context.isDarkMode ? Colors.white : Colors.black87,
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                      FutureBuilder<bool>(
                        future: _controller.canGoForward(),
                        builder: (context, snapshot) {
                          final isCan = snapshot.data ?? false;
                          return Opacity(
                            opacity: isCan ? 1.0 : 0.3,
                            child: IgnorePointer(
                              ignoring: !isCan,
                              child: GestureDetector(
                                behavior: HitTestBehavior.translucent,
                                onTap: isCan
                                    ? () {
                                        _controller.goForward();
                                      }
                                    : null,
                                child: Container(
                                  color: Colors.transparent,
                                  constraints: const BoxConstraints(
                                    minWidth: 50,
                                    minHeight: 50,
                                  ),
                                  child: Icon(
                                    Icons.arrow_forward,
                                    color: context.isDarkMode ? Colors.white : Colors.black87,
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                      GestureDetector(
                        behavior: HitTestBehavior.translucent,
                        child: Container(
                          color: Colors.transparent,
                          constraints: const BoxConstraints(
                            minWidth: 50,
                            minHeight: 50,
                          ),
                          child: Icon(
                            Icons.refresh,
                            color: context.isDarkMode ? Colors.white : Colors.black87,
                          ),
                        ),
                        onTap: () {
                          _controller.reload();
                        },
                      ),
                      GestureDetector(
                        behavior: HitTestBehavior.translucent,
                        onTap: () => _launchURL(context),
                        child: Container(
                          color: Colors.transparent,
                          constraints: const BoxConstraints(
                            minWidth: 50,
                            minHeight: 50,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(
                              bottom: 2.0,
                            ),
                            child: Icon(
                              Platform.isIOS ? FontAwesomeIcons.safari : FontAwesomeIcons.chrome,
                              color: context.isDarkMode ? Colors.white : Colors.black54,
                              size: 19,
                            ),
                          ),
                        ),
                      ),
                      GestureDetector(
                        behavior: HitTestBehavior.translucent,
                        child: Container(
                          color: Colors.transparent,
                          constraints: const BoxConstraints(
                            minWidth: 50,
                            minHeight: 50,
                          ),
                          child: Icon(
                            Icons.close,
                            color: context.isDarkMode ? Colors.white : Colors.black87,
                          ),
                        ),
                        onTap: () => Navigator.maybePop(context),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  void _launchURL(BuildContext context) async {
    if (_uri != null && await canLaunchUrl(_uri!)) {
      await launchUrl(
        _uri!,
        mode: LaunchMode.externalApplication,
      );
    } else {
      await MessageDialog('해당 url 은 열 수 없습니다.').show();
    }
  }

  Future<NavigationDecision> _navigationDecision(NavigationRequest request) async {
    if (request.url.startsWith('https://www.youtube.com/')) {
      debugPrint('blocking navigation to ${request.url}');
      return NavigationDecision.prevent;
    }

    debugPrint('url: ${request.url}, isForMainFrame: ${request.isMainFrame}');
    return NavigationDecision.navigate;
  }
}
