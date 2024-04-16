part of 'color_bloc.dart';

sealed class ColorEvent extends Equatable {
  const ColorEvent();

  @override
  List<Object> get props => [];
}

final class ChangeColorEvent extends ColorEvent {}
