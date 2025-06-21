import 'dart:math';

import 'package:flutter/material.dart';
import 'package:rxdart/rxdart.dart';

import '../../../../common/common.dart';

class TtossAppBar extends StatefulWidget {
  final double appBarHeight;

  const TtossAppBar({
    Key? key,
    required this.appBarHeight,
  }) : super(key: key);

  @override
  State<TtossAppBar> createState() => _TtossAppBarState();
}

class _TtossAppBarState extends State<TtossAppBar> {
  StreamSubscription? _subscription;
  final BehaviorSubject<bool> _isOn = BehaviorSubject.seeded(false);

  int _count = 0;

  @override
  void initState() {
    super.initState();

    /// TODO: Throttle time 1s
    _subscription = _isOn.throttleTime(const Duration(seconds: 1)).listen(
      (value) {
        _listen(value);
      },
    );
  }

  @override
  void dispose() {
    _subscription?.cancel();
    _isOn.close();

    super.dispose();
  }

  Future<void> _listen(bool value) async {
    try {
      _count++;
      debugPrint('count - $_count');

      /// TODO: 가정 - 로그인 / 로그아웃, 2초 걸림
      await Future.delayed(const Duration(seconds: 2));

      /// 실패할 수도 있음.
      if (Random().nextBool()) {
        debugPrint('로그인 성공');
      } else {
        throw '로그인 실패';
      }
    } catch (e, s) {
      /// 실패할 경우, 이전 값 되돌림.
      _isOn.add(!value);

      debugPrint('Error: $e, StackTrace: $s');
    }

    /// 완벽하게 에러를 막기 위한 방법
    /// 1. dialog 같은 팝업 활용 (로그아웃을 하시겠습니까?)
    /// 2. 네트워킹 bool 변수로 현재 API 요청 중이면, 무시하는 로직 추가
  }

  Future<void> _onTap() async {
    _isOn.add(!_isOn.value);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: context.appColors.appBarBackground,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            height: widget.appBarHeight,
            child: Row(
              children: [
                width5,
                StreamBuilder<bool>(
                  stream: _isOn.stream,
                  builder: (context, snapshot) {
                    final value = snapshot.data ?? false;

                    return GestureDetector(
                      onTap: () => _onTap(),
                      behavior: HitTestBehavior.translucent,
                      child: Opacity(
                        opacity: value ? 1 : 0.5,
                        child: Image.asset(
                          '$basePath/icon/toss.png',
                          height: 30,
                        ),
                      ),
                    );
                  },
                ),
                emptyExpanded,
                Image.asset(
                  '$basePath/icon/map_point.png',
                  height: 30,
                ),
                width10,
                Image.asset(
                  '$basePath/icon/notification.png',
                  height: 30,
                ),
                width10,
              ],
            ),
          ),
          const Line(),
        ],
      ),
    );
  }
}
