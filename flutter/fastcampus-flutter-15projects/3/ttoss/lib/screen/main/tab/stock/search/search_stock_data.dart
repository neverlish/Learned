import 'package:fast_app_base/screen/main/tab/stock/vo_simple_stock.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get_rx/get_rx.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:rxdart/rxdart.dart';

import '../../../../../common/common.dart';
import '../../../../../common/util/local_json.dart';

class StockSearchData extends GetxController {
  List<SimpleStock> stocks = [];
  RxList<String> searchHistoryList = <String>[].obs;
  RxList<SimpleStock> searchResult = <SimpleStock>[].obs;

  int _searchCount = 0;

  StreamSubscription? _keywordSubscription;
  final BehaviorSubject<String> _keyword = BehaviorSubject.seeded('');

  @override
  void onInit() {
    super.onInit();

    searchHistoryList.addAll(['삼성전자', 'LG전자', '현대차', '넷플릭스']);
    () async {
      stocks.addAll(await LocalJson.getObjectList("json/stock_list.json"));
    }();

    /// TODO: Throttle time 1s
    _keywordSubscription =
        _keyword.debounceTime(const Duration(seconds: 1)).listen(
      (text) {
        _requestSearch(text);
      },
    );
  }

  Future<void> _requestSearch(String text) async {
    _searchCount++;
    debugPrint('Search count: $_searchCount, Network delay 0.5s');

    try {
      /// TODO: 가정 - 네트워킹 시간 0.5s
      await Future.delayed(const Duration(milliseconds: 500));
      final result =
          stocks.where((element) => element.name.contains(text)).toList();

      searchResult.value = result;
    } catch (e, s) {
      debugPrint(e.toString());
      debugPrint(s.toString());
    }
  }

  Future<void> changeKeyword(String text) async {
    _keyword.value = text;

    if (isBlank(text)) {
      searchResult.clear();
      return;
    }
  }

  void addSearchHistory(String stockName) {
    searchHistoryList.insert(0, stockName);
  }

  @override
  void onClose() {
    _keywordSubscription?.cancel();
    _keyword.close();

    super.onClose();
  }
}
