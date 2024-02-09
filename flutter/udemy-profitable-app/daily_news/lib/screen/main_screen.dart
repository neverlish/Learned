import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  List<dynamic> lstNewsInfo = [];
  late String admobBannerId;
  late BannerAd _bannerAd;

  @override
  void initState() {
    super.initState();
    getNewsInfo();

    setAdMob();
  }

  Future getNewsInfo() async {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl =
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=$apiKey";
    try {
      final response = await http.get(Uri.parse(apiUrl));
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        setState(() {
          lstNewsInfo = responseData['articles'];
        });
      } else {
        throw Exception('Failed to load news');
      }
    } catch (e) {
      print('Failed to load news');
    }
  }

  String get bannerAdUnitId {
    if (Platform.isAndroid) {
      if (kReleaseMode) {
        return 'VALUE';
      } else {
        return 'VALUE';
      }
    } else if (Platform.isIOS) {
      if (kReleaseMode) {
        return 'ca-app-pub-3939050617583923/6409768121';
      } else {
        return 'ca-app-pub-3940256099942544/2934735716';
      }
    } else {
      throw UnsupportedError('Unsupported platform');
    }
  }

  void setAdMob() {
    _bannerAd = BannerAd(
      adUnitId: bannerAdUnitId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          setState(() {});
        },
        onAdFailedToLoad: (ad, error) {
          ad.dispose();
        },
      ),
    );
    _bannerAd.load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff424242),
        title: const Text(
          '📰HeadLine News',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: lstNewsInfo.length,
              itemBuilder: (context, index) {
                var newsItem = lstNewsInfo[index];
                return GestureDetector(
                  child: Container(
                    margin: const EdgeInsets.all(16),
                    child: Stack(
                      alignment: Alignment.bottomCenter,
                      children: [
                        SizedBox(
                          width: double.infinity,
                          height: 170,
                          child: newsItem['urlToImage'] != null
                              ? ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: Image.network(
                                    newsItem['urlToImage'],
                                    fit: BoxFit.cover,
                                  ),
                                )
                              : ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: Image.asset(
                                    'assets/noimage.png',
                                    fit: BoxFit.cover,
                                  ),
                                ),
                        ),
                        Container(
                          width: double.infinity,
                          height: 57,
                          decoration: ShapeDecoration(
                            color: Colors.black.withOpacity(0.7),
                            shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.only(
                                bottomLeft: Radius.circular(10),
                                bottomRight: Radius.circular(10),
                              ),
                            ),
                          ),
                          child: Container(
                            margin: const EdgeInsets.all(8),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Text(
                                  newsItem['title'],
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 6),
                                Align(
                                  alignment: Alignment.bottomRight,
                                  child: Text(
                                    formatDate(newsItem['publishedAt']),
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 10,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        )
                      ],
                    ),
                  ),
                  onTap: () {
                    Navigator.pushNamed(context, '/detail',
                        arguments: newsItem);
                  },
                );
              },
            ),
          ),
          SizedBox(
            width: _bannerAd.size.width.toDouble(),
            height: _bannerAd.size.height.toDouble(),
            child: AdWidget(ad: _bannerAd),
          )
        ],
      ),
    );
  }

  String formatDate(String dateString) {
    final dateTime = DateTime.parse(dateString);
    final formatter = DateFormat('yyyy.MM.dd HH:mm');
    return formatter.format(dateTime);
  }
}
