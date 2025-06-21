import 'package:daangn_ui/common/theme/custom_theme.dart';
import 'package:fast_app_base/common/data/preference/item/nullable_preference_item.dart';

class Prefs {
  static final appTheme = NullablePreferenceItem<CustomTheme>('appTheme');
}
