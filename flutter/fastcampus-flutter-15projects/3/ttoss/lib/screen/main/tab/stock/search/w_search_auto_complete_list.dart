import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/screen/main/tab/stock/search/s_stock_detail.dart';
import 'package:fast_app_base/screen/main/tab/stock/search/search_stock_data.dart';
import 'package:flutter/material.dart';

class SearchAutoCompleteList extends StatelessWidget
    with SearchStockDataProvider {
  final TextEditingController controller;
  SearchAutoCompleteList(this.controller, {super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) {
        final stock = searchData.autoCompleteList[index];
        final stockName = stock.name;
        return Tap(
          onTap: () {
            controller.clear();
            searchData.addHistory(stock);
            Nav.push(StockDetailScreen(stockName));
          },
          child: stockName.text.make(),
        ).p(20);
      },
      itemCount: searchData.autoCompleteList.length,
    );
  }
}
