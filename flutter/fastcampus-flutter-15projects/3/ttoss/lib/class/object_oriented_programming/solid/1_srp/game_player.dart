//Property 분리
import 'package:fast_app_base/class/object_oriented_programming/solid/1_srp/player_game_property.dart';
import 'package:fast_app_base/class/object_oriented_programming/solid/1_srp/player_profile.dart';

class GamePlayer {
  GamePlayer(this.playerProfile, {required this.gameProperty});

  PlayerProfile playerProfile;
  PlayerGameProperty gameProperty;
}
