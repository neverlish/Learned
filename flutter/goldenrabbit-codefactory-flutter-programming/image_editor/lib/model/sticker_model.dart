class StickerModel {
  final String id;
  final String imgPath;

  StickerModel({
    required this.id,
    required this.imgPath,
  });

  @override
  bool operator ==(Object other) {
    return (other as StickerModel).id == id;
  }

  @override
  int get hashCode => id.hashCode;
}
