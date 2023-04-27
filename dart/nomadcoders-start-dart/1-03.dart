bool isEmpty(String string) => string.length == 0;

void main() {
  // isEmpty(null);
  isEmpty("");

  String? nico = 'nico';
  nico = null;
  // nico.length;
  if (nico != null) {
    nico.isNotEmpty;
  }

  nico?.length;
}