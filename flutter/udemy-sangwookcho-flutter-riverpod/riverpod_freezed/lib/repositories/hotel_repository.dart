import 'dart:convert';

import '../models/hotel.dart';

const String jsonData = '''
[
  {
    "name":"ABC",
    "classification":5,
    "city":"New York",
    "parking_lot_capacity":500,
    "reviews":[
      {
        "score":4.5,
        "review":"Excellent"
      },
      {
        "score":5.0,
        "review":"Very friendly staff, excellent service!"
      }
    ]
  },
  {
    "name":"DEF",
    "classification":5,
    "city":"Boston",
    "reviews":[
      {
        "score":4.0,
        "review":"Very good"
      },
      {
        "score":5.0
      }
    ]
  },
  {
    "name":"GHI",
    "classification":5,
    "city":"LA"
  },
  {
    "name":"JKL",
    "classification":5,
    "city":"Chicago",
    "parking_lot_capacity":250,
    "reviews":[
      {
        "score":5,
        "review":"Recommended"
      },
      {
        "score":5.0,
        "review":"Soooo goooood"
      }
    ]
  }
]
''';

Future<List<Hotel>> fetchHotels() async {
  await Future.delayed(const Duration(seconds: 1));

  final List hotelList = jsonDecode(jsonData);

  final hotels = [for (final hotel in hotelList) Hotel.fromJson(hotel)];

  print(hotels[0]);

  return hotels;
}