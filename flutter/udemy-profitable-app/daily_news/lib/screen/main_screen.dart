import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  List<dynamic> lstNewsInfo = [];

  @override
  void initState() {
    super.initState();
    getNewsInfo();
  }

  Future getNewsInfo() async {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl =
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=$apiKey";
    try {
      final response = await http.get(Uri.parse(apiUrl));
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        lstNewsInfo = responseData['articles'];
        for (var element in lstNewsInfo) {
          print(element['title']);
        }
      } else {
        throw Exception('Failed to load news');
      }
    } catch (e) {
      print('Failed to load news');
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold();
  }
}
