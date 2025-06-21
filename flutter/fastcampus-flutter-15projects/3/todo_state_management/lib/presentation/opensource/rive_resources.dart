import 'package:fast_app_base/presentation/opensource/vo_package.dart';

import 'create_common_4.dart';

List<Package> get riveResources => [
      Package(
          name: 'Fire Button',
          description:
              'This is an idea to create an On/Off button. I configured the state machine to remember the state at the start and for the interaction. #Button #Bones #StateMachine #Listeners #Constraints\n'
              'Changes:\n'
              '- Remove background fills\n'
              '- change artboard Size',
          authors: ['JcToon'],
          version: '23 Nov 2022',
          isMarkdown: false,
          isSdk: false,
          homepage: 'https://rive.app/@JcToon/',
          license: cc4license,
          isDirectDependency: false)
    ];
