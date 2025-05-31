import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

Stream<Event> appEventTransformer<Event>(
  Stream<Event> events,
  EventMapper<Event> mapper,
) {
  debugPrint('appEventTransformer');
  return events;
}
