import 'notification_type.dart';

class DaangnNotification {
  final NotificationType type;
  final String title;
  final String description;
  final DateTime time;
  bool isRead;

  DaangnNotification(
    this.type,
    this.title,
    this.description,
    this.time, {
    this.isRead = false,
  });
}
