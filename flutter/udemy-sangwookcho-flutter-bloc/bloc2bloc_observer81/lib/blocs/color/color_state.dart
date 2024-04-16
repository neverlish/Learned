part of 'color_bloc.dart';

final class ColorState extends Equatable {
  const ColorState({
    required this.color,
  });

  factory ColorState.initial() {
    return const ColorState(color: Colors.red);
  }

  final Color color;

  @override
  List<Object> get props => [color];

  @override
  String toString() => 'ColorState(color: $color)';

  ColorState copyWith({
    Color? color,
  }) {
    return ColorState(
      color: color ?? this.color,
    );
  }
}
