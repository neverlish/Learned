//Method 분리
class TodoNote {
  String title = '';
  String content = '';
  DateTime createdDate = DateTime.now();
  DateTime modifiedDate = DateTime.now();

  void setContent(String title, String content) {
    this.title = title;
    this.content = content;
  }
}
