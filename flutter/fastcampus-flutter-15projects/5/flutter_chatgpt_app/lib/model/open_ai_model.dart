// Message
class Messages {
  late final String role;
  late final String content;

  Messages({required this.role, required this.content});

  Messages.fromJson(Map<String, dynamic> json) {
    role = json['role'];
    content = json['content'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data["role"] = role;
    data["content"] = content;
    return data;
  }

  Map<String, String> toMap() {
    return {"role": role, "content": content};
  }

  Messages copyWith({String? role, String? content}) {
    return Messages(
      role: role ?? this.role,
      content: content ?? this.content,
    );
  }
}
// ChetCompletionModel

class ChatCompletionModel {
  late final String model;
  late final List<Messages> messages;
  late final bool stream;

  ChatCompletionModel({
    required this.model,
    required this.messages,
    required this.stream,
  });

  ChatCompletionModel.fromJson(Map<String, dynamic> json) {
    model = json['model'];
    messages =
        List.from(json["messages"]).map((e) => Messages.fromJson(e)).toList();
    stream = json[stream];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['model'] = model;
    data['messages'] = messages.map((e) => e.toJson()).toList();
    data['stream'] = stream;
    return data;
  }
}
