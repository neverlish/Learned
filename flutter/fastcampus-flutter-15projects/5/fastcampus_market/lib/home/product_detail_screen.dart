import 'package:fastcampus_market/model/product.dart';
import 'package:flutter/material.dart';

class ProductDetailScreen extends StatefulWidget {
  final Product product;
  const ProductDetailScreen({super.key, required this.product});

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("${widget.product.title}"),
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 320,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.orange,
                      image: DecorationImage(
                        image: NetworkImage(widget.product.imgUrl ?? ""),
                        fit: BoxFit.cover,
                      ),
                    ),
                    child: Center(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          switch (widget.product.isSale) {
                            true => Container(
                            decoration: const BoxDecoration(
                              color: Colors.red,
                            ),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 24,
                              vertical: 12,
                            ),
                            child: const Text(
                              '할인중',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                              ),
                            _ => Container(),
                          }
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              widget.product.title ?? '패캠 플러터',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 24,
                              ),
                            ),
                            PopupMenuButton(itemBuilder: (context) {
                              return [
                                PopupMenuItem(
                                  child: const Text('리뷰 등록'),
                                  onTap: () {
                                    int reviewScore = 0;
                                    showDialog(
                                      context: context,
                                      builder: (context) {
                                        TextEditingController reviewTEC =
                                            TextEditingController();
                                        return StatefulBuilder(
                                            builder: (context, setState) {
                                          return AlertDialog(
                                            title: const Text('리뷰 등록'),
                                            content: Column(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                TextField(
                                                  controller: reviewTEC,
                                                ),
                                                Row(
                                                  children: List.generate(
                                                    5,
                                                    (index) => IconButton(
                                                      onPressed: () {
                                                        setState(() =>
                                                            reviewScore =
                                                                index);
                                                      },
                                                      icon: Icon(
                                                        Icons.star,
                                                        color:
                                                            index <= reviewScore
                                                                ? Colors.orange
                                                                : Colors.grey,
                                                      ),
                                                    ),
                                                  ),
                                                )
                                              ],
                                            ),
                                            actions: [
                                              TextButton(
                                                onPressed: () =>
                                                    Navigator.of(context).pop(),
                                                child: const Text('취소'),
                                              ),
                                              TextButton(
                                                onPressed: () {},
                                                child: const Text('등록'),
                                              ),
                                            ],
                                          );
                                        });
                                      },
                                    );
                                  },
                                ),
                              ];
                            })
                          ],
                        ),
                        const Text('제품 상세 정보'),
                        Text("${widget.product.description}"),
                        Row(
                          children: [
                            Text(
                              "${widget.product.price ?? "100000"} 원",
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            const Spacer(),
                            const Icon(
                              Icons.star,
                              color: Colors.orange,
                            ),
                            const Text('4.5'),
                          ],
                        )
                      ],
                    ),
                  ),
                  DefaultTabController(
                    length: 2,
                    child: Column(
                      children: [
                        const TabBar(
                          tabs: [
                            Tab(text: '제품 상세'),
                            Tab(text: '리뷰'),
                          ],
                        ),
                        SizedBox(
                          height: 500,
                          child: TabBarView(
                            children: [
                              Container(
                                child: const Text('제품 상세'),
                              ),
                              Container(
                                child: const Text('리뷰'),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          GestureDetector(
            child: Container(
              height: 72,
              decoration: BoxDecoration(
                color: Colors.red[100],
              ),
              child: const Center(
                child: Text(
                  '장바구니',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
