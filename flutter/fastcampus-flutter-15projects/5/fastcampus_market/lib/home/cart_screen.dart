import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fastcampus_market/model/product.dart';
import 'package:flutter/material.dart';

class CartScreen extends StatefulWidget {
  final String uid;
  const CartScreen({super.key, required this.uid});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  Stream<QuerySnapshot<Map<String, dynamic>>>? streamCartItems() {
    return FirebaseFirestore.instance
        .collection('cart')
        .where('uid', isEqualTo: widget.uid)
        .orderBy('timestamp')
        .snapshots();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('장바구니'),
      ),
      body: Column(
        children: [
          Expanded(
            child: StreamBuilder(
              stream: streamCartItems(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  List<Cart> items = snapshot.data?.docs.map((e) {
                        final foo = Cart.fromJson(e.data());
                        return foo.copyWith(cartDocId: e.id);
                      }).toList() ??
                      [];
                  return ListView.separated(
                    itemCount: items.length,
                    itemBuilder: (context, index) {
                      final item = items[index];
                      num price = (item.product!.isSale ?? false)
                          ? ((item.product!.price! *
                                  (item.product!.saleRate! / 100)) *
                              (item.count ?? 1))
                          : (item.product!.price! * (item.count ?? 1));

                      return Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Row(
                          children: [
                            Container(
                              height: 120,
                              width: 120,
                              decoration: BoxDecoration(
                                color: Colors.blue,
                                borderRadius: BorderRadius.circular(8),
                                image: DecorationImage(
                                  image:
                                      NetworkImage(item.product!.imgUrl ?? ""),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.only(left: 16),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(item.product?.title ?? ""),
                                        IconButton(
                                          onPressed: () {
                                            final db =
                                                FirebaseFirestore.instance;
                                            final ref = db
                                                .collection('cart')
                                                .doc("${item.cartDocId}");

                                            ref.get().then((value) =>
                                                value.reference.delete());
                                          },
                                          icon: const Icon(Icons.delete),
                                        )
                                      ],
                                    ),
                                    Text("${price.toStringAsFixed(0)}원"),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.end,
                                      children: [
                                        IconButton(
                                          onPressed: () {
                                            int count = item.count ?? 1;
                                            count--;
                                            if (count <= 1) {
                                              count = 1;
                                            }
                                            FirebaseFirestore.instance
                                                .collection('cart')
                                                .doc("${item.cartDocId}")
                                                .update({'count': count});
                                          },
                                          icon: const Icon(
                                              Icons.remove_circle_outline),
                                        ),
                                        Text("${item.count ?? 1}"),
                                        IconButton(
                                          onPressed: () {
                                            int count = item.count ?? 1;
                                            count++;
                                            if (count >= 99) {
                                              count = 99;
                                            }
                                            FirebaseFirestore.instance
                                                .collection('cart')
                                                .doc("${item.cartDocId}")
                                                .update({'count': count});
                                          },
                                          icon: const Icon(
                                              Icons.add_circle_outline),
                                        ),
                                      ],
                                    )
                                  ],
                                ),
                              ),
                            )
                          ],
                        ),
                      );
                    },
                    separatorBuilder: (context, _) => const Divider(),
                  );
                }
                return const Center(
                  child: CircularProgressIndicator(),
                );
              },
            ),
          ),
          const Divider(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  '합계',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
                StreamBuilder(
                  stream: streamCartItems(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      List<Cart> item = snapshot.data?.docs.map((e) {
                            final foo = Cart.fromJson(e.data());
                            return foo.copyWith(cartDocId: e.id);
                          }).toList() ??
                          [];

                      double totalPrice = 0;

                      for (var element in item) {
                        if (element.product!.isSale ?? false) {
                          totalPrice += (element.product!.price! *
                              (element.product!.saleRate! / 100) *
                              (element.count ?? 1));
                        } else {
                          totalPrice +=
                              (element.product!.price! * (element.count ?? 1));
                        }
                      }
                      return Text(
                        '${totalPrice.toStringAsFixed(0)}원',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 24,
                        ),
                      );
                    }
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  },
                )
              ],
            ),
          ),
          Container(
            height: 72,
            decoration: BoxDecoration(
              color: Colors.red[100],
            ),
            child: const Center(
              child: Text(
                '배달 주문',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
