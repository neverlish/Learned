import 'dart:io';

import 'package:fast_app_base/common/widget/loading.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';

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
  InAppWebViewController? _webView;
  Uri? _uri;
  double _progress = 0;
  bool _isShowLoadingIndicator = true;

  @override
  void initState() {
    super.initState();
    _uri = Uri.tryParse(widget.url);
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
                      child: InAppWebView(
                        initialUrlRequest: URLRequest(
                          url: _uri,
                          headers: {},
                        ),
                        initialOptions: InAppWebViewGroupOptions(
                          crossPlatform: InAppWebViewOptions(
                            javaScriptEnabled: true,
                            javaScriptCanOpenWindowsAutomatically: true,
                            useShouldOverrideUrlLoading: true,
                          ),

                          /// TODO: IOSInAppWebViewOptions
                          ios: IOSInAppWebViewOptions(
                            allowsInlineMediaPlayback: true,
                            allowsLinkPreview: false,
                            sharedCookiesEnabled: true,
                          ),
                        ),
                        shouldOverrideUrlLoading: _navigationActionPolicy,
                        onWebViewCreated: (controller) {
                          _webView = controller;
                        },
                        onLoadStart: (controller, url) {
                          debugPrint('onLoadStart url: $url');
                          _uri = url;
                        },
                        onLoadStop: (controller, url) {
                          debugPrint('onLoadStop url: $url');
                          _uri = url;
                          if (_isShowLoadingIndicator) {
                            setState(() {
                              _isShowLoadingIndicator = false;
                            });
                          }
                        },
                        onLoadError: (controller, url, code, message) {
                          debugPrint('onLoadError url: $url, code: $code, message: $message');

                          if (_isShowLoadingIndicator) {
                            setState(() {
                              _isShowLoadingIndicator = false;
                            });
                          }
                        },
                        onProgressChanged: (controller, progress) {
                          debugPrint('onProgressChanged progress: $progress');
                          setState(() {
                            _progress = progress / 100;
                          });
                        },
                      ),
                    ),
                    SizedBox(
                      height: MediaQuery.of(context).padding.bottom + 50.0,
                    ),
                  ],
                ),
                if (_isShowLoadingIndicator) LoadingIndicator.small(),
              ],
            ),
            bottomSheet: _buildBottomSheet(context),
          ),
        ),
      ),
    );
  }

  Widget _buildBottomSheet(BuildContext context) {
    final bottomPadding = MediaQuery.of(context).padding.bottom;
    final theme = context.theme;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        SizedBox(
          height: _progress < 1.0 ? 4 : 0,
          child: _progress < 1.0
              ? LinearProgressIndicator(
                  value: _progress,
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
                      FutureBuilder<bool>(
                        future: _webView?.canGoBack() ?? Future.value(false),
                        builder: (context, snapshot) {
                          final canGoBack = snapshot.data ?? false;
                          return Opacity(
                            opacity: canGoBack ? 1.0 : 0.3,
                            child: IgnorePointer(
                              ignoring: !canGoBack,
                              child: GestureDetector(
                                behavior: HitTestBehavior.translucent,
                                onTap: canGoBack
                                    ? () {
                                        _webView?.goBack();
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
                        future: _webView?.canGoForward() ?? Future.value(false),
                        builder: (context, snapshot) {
                          final canGoForward = snapshot.data ?? false;
                          return Opacity(
                            opacity: canGoForward ? 1.0 : 0.3,
                            child: IgnorePointer(
                              ignoring: !canGoForward,
                              child: GestureDetector(
                                behavior: HitTestBehavior.translucent,
                                onTap: canGoForward
                                    ? () {
                                        _webView?.goForward();
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
                          if (_webView != null) {
                            _webView!.reload();
                          }
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

  Future<NavigationActionPolicy?> _navigationActionPolicy(
      InAppWebViewController controller, NavigationAction navigationAction) async {
    debugPrint(
        'url: ${navigationAction.request.url}, isForMainFrame: ${navigationAction.isForMainFrame}');
    return NavigationActionPolicy.ALLOW;
  }
}
