import 'dart:async';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoadingIndicator extends StatelessWidget {
  final double size;
  final bool animating;

  factory LoadingIndicator.small({
    Key? key,
    double size = 10,
  }) =>
      LoadingIndicator(
        key: key,
        size: size,
      );

  factory LoadingIndicator.large({
    Key? key,
    double size = 15,
  }) =>
      LoadingIndicator(
        key: key,
        size: size,
      );

  const LoadingIndicator({
    Key? key,
    this.size = 10,
    this.animating = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = context.theme;
    return Center(
      child: Platform.isIOS
          ? CupertinoActivityIndicator(
              radius: size,
              animating: animating,
            )
          : CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(theme.primaryColor),
            ),
    );
  }
}

class LoadingController {
  ValueNotifier<bool>? _showsLoadingIndicator;

  bool get showsLoadingIndicator => _showsLoadingIndicator?.value ?? false;

  LoadingController({
    bool initialShows = false,
  }) {
    _showsLoadingIndicator = ValueNotifier(initialShows);
  }

  void show() {
    try {
      _showsLoadingIndicator?.value = true;
    } catch (_) {}
  }

  void hide() {
    try {
      _showsLoadingIndicator?.value = false;
    } catch (_) {}
  }

  void dispose() {
    _showsLoadingIndicator?.dispose();
  }
}

class Loading extends StatefulWidget {
  final LoadingIndicator? indicator;
  final LoadingController? controller;
  final Widget child;
  final Stream<bool>? stream;
  final Color backgroundColor;

  const Loading({
    Key? key,
    this.indicator,
    required this.controller,
    required this.child,
    this.stream,
    this.backgroundColor = Colors.transparent,
  })  : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _LoadingState createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {
  StreamSubscription? _streamSubscription;
  bool _isShowLoadingIndicator = false;

  @override
  void initState() {
    super.initState();
    widget.controller?._showsLoadingIndicator?.addListener(_handleShowsLoadingIndicator);
    if (widget.stream != null) {
      _streamSubscription = widget.stream!.listen((event) {
        widget.controller?._showsLoadingIndicator?.value = event;
      });
    }
  }

  @override
  void dispose() {
    widget.controller?._showsLoadingIndicator?.removeListener(_handleShowsLoadingIndicator);
    _streamSubscription?.cancel();
    super.dispose();
  }

  void _handleShowsLoadingIndicator() {
    final shows = widget.controller?._showsLoadingIndicator?.value ?? false;

    if (_isShowLoadingIndicator != shows) {
      setState(() {
        _isShowLoadingIndicator = shows;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final indicator = widget.indicator ?? LoadingIndicator.small();

    return Stack(
      children: <Widget>[
        widget.child,
        if (_isShowLoadingIndicator) Material(color: widget.backgroundColor, child: indicator),
      ],
    );
  }
}
