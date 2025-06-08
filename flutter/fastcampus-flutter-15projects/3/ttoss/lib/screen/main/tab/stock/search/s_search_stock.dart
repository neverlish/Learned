import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/screen/main/tab/stock/search/search_stock_data.dart';
import 'package:fast_app_base/screen/main/tab/stock/search/w_popular_search_stock_list.dart';
import 'package:fast_app_base/screen/main/tab/stock/search/w_search_history_stock_list.dart';
import 'package:fast_app_base/screen/main/tab/stock/search/w_stock_search_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 's_stock_detail.dart';

class StockSearchScreen extends StatefulWidget {
  const StockSearchScreen({Key? key}) : super(key: key);

  @override
  State<StockSearchScreen> createState() => _StockSearchScreenState();
}

class _StockSearchScreenState extends State<StockSearchScreen> {
  final TextEditingController _controller = TextEditingController();
  late final searchData = Get.find<StockSearchData>();

  @override
  void initState() {
    if (!Get.isRegistered<StockSearchData>()) {
      Get.put(StockSearchData());
    }
    _controller.addListener(_listenTextEditingController);
    super.initState();
  }

  void _listenTextEditingController() {
    searchData.changeKeyword(_controller.text);
  }

  @override
  void dispose() {
    searchData.searchResult.clear();

    _controller.removeListener(_listenTextEditingController);
    _controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.appColors.appBarBackground,
      appBar: StockSearchAppBar(controller: _controller),
      body: Obx(
        () => searchData.searchResult.isEmpty
            ? ListView(
                children: const [
                  SearchHistoryList(),
                  PopularSearchStockList(),
                ],
              )
            : ListView.builder(
                itemCount: searchData.searchResult.length,
                itemBuilder: (BuildContext context, int index) {
                  final element = searchData.searchResult[index];
                  return Tap(
                    onTap: () {
                      Nav.push(StockDetailScreen(element.name));
                      searchData.addSearchHistory(element.name);
                      _controller.clear();
                    },
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      child: element.name.text.make(),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
