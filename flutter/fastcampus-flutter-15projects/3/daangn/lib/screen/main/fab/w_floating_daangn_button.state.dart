import 'package:freezed_annotation/freezed_annotation.dart';

part 'w_floating_daangn_button.state.freezed.dart';

@freezed
class FloatingButtonState with _$FloatingButtonState {
  const factory FloatingButtonState(
    bool isExpanded,
    bool isSmall,
  ) = _FloatingButtonState;
}
